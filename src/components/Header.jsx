import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { generateId } from '../utils/helpers';

const Header = () => {
  const { cart } = useCart();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authMethod, setAuthMethod] = useState('email');
  const [adminCode, setAdminCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [signupStep, setSignupStep] = useState(1);
  const [generatedAdminCode, setGeneratedAdminCode] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  const handleAdminAuth = () => {
    setShowAuthModal(true);
    setIsLoginMode(true);
    setSignupStep(1);
  };

  const validateForm = () => {
    setError('');
    
    if (!isLoginMode && signupStep === 1) {
      if (!fullName.trim()) {
        setError('Le nom complet est requis');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Adresse email invalide');
        return false;
      }
      if (!/^(\+\d{1,3})?\d{9,15}$/.test(phone)) {
        setError('Numéro de téléphone invalide');
        return false;
      }
    }
    
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isLoginMode) {
      // Authentification
      const admins = JSON.parse(localStorage.getItem('admins')) || [];
      
      let admin;
      if (authMethod === 'email') {
        admin = admins.find(a => a.email === email && a.password === password);
      } else {
        admin = admins.find(a => a.adminCode === adminCode && a.password === password);
      }

      if (admin) {
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('currentAdmin', JSON.stringify(admin));
        setShowAuthModal(false);
        window.location.reload();
      } else {
        setError('Identifiants incorrects');
      }
    } else {
      if (signupStep === 1) {
        // Générer le code admin et passer à l'étape 2
        const newAdminCode = generateId('QrAd');
        setGeneratedAdminCode(newAdminCode);
        setSignupStep(2);
      } else {
        // Étape 2 : Enregistrement final
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        
        if (admins.some(admin => admin.email === email)) {
          setError('Cet email est déjà utilisé');
          return;
        }

        if (admins.some(admin => admin.adminCode === generatedAdminCode)) {
          setError('Erreur de génération de code, veuillez réessayer');
          return;
        }

        const newAdmin = {
          fullName,
          email,
          phone,
          adminCode: generatedAdminCode,
          password
        };

        admins.push(newAdmin);
        localStorage.setItem('admins', JSON.stringify(admins));
        
        setSuccessMessage(`Compte créé avec succès! Redirection en cours...`);
        
        setTimeout(() => {
          localStorage.setItem('adminAuthenticated', 'true');
          localStorage.setItem('currentAdmin', JSON.stringify(newAdmin));
          setShowAuthModal(false);
          window.location.reload();
        }, 2000);
      }
    }
  };

  const switchAuthMethod = () => {
    setAuthMethod(authMethod === 'email' ? 'code' : 'email');
    setAdminCode('');
    setEmail('');
    setError('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedAdminCode);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Reset form when closing modal
      setIsLoginMode(true);
      setSignupStep(1);
      setFullName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setAdminCode('');
      setError('');
      setSuccessMessage('');
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAuthModal]);

  return (
    <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="mr-2">🍽️</span>
          Menuvo
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link 
            to="/" 
            className={`hover:text-orange-200 transition-all duration-300 ${location.pathname === '/' ? 'border-b-2 border-white font-medium' : ''}`}
          >
            Accueil
          </Link>
          <Link 
              to="/menu/demo" 
              className={`hover:text-orange-200 transition-all duration-300 ${location.pathname === '/menu/demo' ? 'border-b-2 border-white font-medium' : ''}`}
            >
              Démo
            </Link>
          <Link 
            to="/manager/dashboard" 
            className={`hover:text-orange-200 transition-all duration-300 ${location.pathname.startsWith('/manager') ? 'border-b-2 border-white font-medium' : ''}`}
          >
            Manager
          </Link>
          <Link 
            to="/admin/dashboard" 
            className={`hover:text-orange-200 transition-all duration-300 ${location.pathname.startsWith('/admin') ? 'border-b-2 border-white font-medium' : ''}`}
          >
            Admin
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {location.pathname.startsWith('/menu') && (
            <Link to="/cart" className="relative transition-transform duration-300 hover:scale-110">
              <span className="text-2xl">🛒</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                  {getCartCount()}
                </span>
              )}
            </Link>
          )}
          
          <button 
            onClick={handleAdminAuth}
            className="bg-orange-400 hover:bg-transparent px-4 py-2 rounded-lg text-sm font-medium
             transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Modal d'authentification Admin */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md transform transition-all duration-300 animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2 w-full">
                <button
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isLoginMode 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    setIsLoginMode(true);
                    setSignupStep(1);
                    setError('');
                    setSuccessMessage('');
                  }}
                >
                  Se connecter
                </button>
                <button
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                    !isLoginMode 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    setIsLoginMode(false);
                    setSignupStep(1);
                    setError('');
                    setSuccessMessage('');
                  }}
                >
                  Créer un compte
                </button>
              </div>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="text-gray-500 hover:text-gray-700 ml-4 transition-transform duration-300 hover:rotate-90"
              >
                &times;
              </button>
            </div>
            
            {!isLoginMode && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Étape {signupStep} sur 2</span>
                  <span>{signupStep === 1 ? 'Informations' : 'Code Admin'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: signupStep === 1 ? '50%' : '100%' }}
                  ></div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {!isLoginMode && signupStep === 1 && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="fullName">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="phone">
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      pattern="(\+\d{1,3})?\d{9,15}"
                    />
                  </div>
                </>
              )}
              
              {isLoginMode && signupStep === 1 && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700" htmlFor={authMethod === 'email' ? 'email' : 'adminCode'}>
                      {authMethod === 'email' ? 'Email' : 'Code Admin'}
                    </label>
                    <button
                      type="button"
                      className="text-indigo-600 text-sm hover:underline transition-all duration-300"
                      onClick={switchAuthMethod}
                    >
                      {authMethod === 'email' 
                        ? 'Utiliser un code admin' 
                        : 'Utiliser mon email'}
                    </button>
                  </div>
                  
                  {authMethod === 'email' ? (
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      required
                      pattern="QrAd\w+"
                      title="Format: QrAd suivi de caractères alphanumériques"
                    />
                  )}
                </div>
              )}
              
              {signupStep === 1 && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="password">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                  <p className="text-xs text-gray-500 mt-1">Au moins 6 caractères</p>
                </div>
              )}
              
              {!isLoginMode && signupStep === 2 && (
                <div className="mb-6 text-center py-4">
                  <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl p-6 mb-4">
                    <p className="text-gray-700 mb-2">Votre code administrateur unique :</p>
                    <div className="flex items-center justify-center">
                      <span className={`text-2xl font-mono font-bold text-indigo-700 ${isAnimating ? 'animate-pulse' : ''}`}>
                        {generatedAdminCode}
                      </span>
                      <button
                        type="button"
                        onClick={copyToClipboard}
                        className="ml-2 text-indigo-600 hover:text-indigo-800 transition-all duration-300"
                        title="Copier le code"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                  <p className="text-red-500 text-sm mb-4">
                    ⚠️ Veuillez enregistrer ce code en lieu sûr. Il sera requis pour toutes vos connexions futures.
                  </p>
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100 animate-shake">
                  {error}
                </div>
              )}
              
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 text-green-500 text-sm rounded-lg border border-green-100">
                  {successMessage}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                {!isLoginMode && signupStep === 2 && (
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-all duration-300"
                    onClick={() => setSignupStep(1)}
                  >
                    &larr; Retour
                  </button>
                )}
                
                <div className="flex-1"></div>
                
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  {isLoginMode 
                    ? "Se connecter" 
                    : signupStep === 1 
                      ? "Continuer" 
                      : "Confirmer l'inscription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;