import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrderContext';
import CartItem from '../../components/CartItem';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CartPage = () => {
  const { cart, updateCustomerInfo, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = useState(cart.customerName || '');
  const [customerPhone, setCustomerPhone] = useState(cart.customerPhone || '');
  const [tableNumber, setTableNumber] = useState(cart.tableNumber || '');
  const [deliveryOption, setDeliveryOption] = useState(cart.deliveryOption || 'surPlace');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [message, setMessage] = useState({ show: false, text: '', type: '' });
  
  const showMessage = (text, type) => {
    setMessage({ show: true, text, type });
    setTimeout(() => setMessage({ show: false, text: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerName || !customerPhone) {
      showMessage('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }
    
    if (deliveryOption === 'surPlace' && !tableNumber) {
      showMessage('Veuillez indiquer votre numéro de table', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    updateCustomerInfo({
      customerName,
      customerPhone,
      tableNumber,
      deliveryOption
    });
    
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Vérifier que placeOrder existe
      if (placeOrder && typeof placeOrder === 'function') {
        const newOrder = placeOrder({
          items: cart.items,
          total: cart.total,
          customerName,
          customerPhone,
          tableNumber,
          deliveryOption
        });
        
        clearCart();
        setIsSubmitting(false);
        showMessage('Commande passée avec succès!', 'success');
        
        // Redirection après 2 secondes
        setTimeout(() => {
          navigate(`/track-order/${newOrder.id}`);
        }, 2000);
      } else {
        throw new Error('placeOrder n\'est pas une fonction');
      }
    } catch (error) {
      setIsSubmitting(false);
      showMessage('Erreur lors du traitement de la commande', 'error');
      console.error('Erreur placeOrder:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <AnimatePresence>
        {message.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
              message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            } text-white flex items-center`}
          >
            <span>{message.text}</span>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMessage({...message, show: false})}
              className="ml-4 text-xl"
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Votre Panier
      </motion.h1>
      
      {cart.items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div 
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-5xl mb-4"
          >
            🛒
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Votre panier est vide</h2>
          <p className="text-gray-600 mb-6">
            Parcourez notre menu et ajoutez des délicieux plats à votre commande
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium py-2 px-6 rounded-md shadow-md transition-all duration-300"
          >
            Voir le menu
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-6">Articles</h2>
              
              <div className="divide-y divide-gray-200">
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item.cartId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CartItem
                      item={item}
                      onUpdateQuantity={cart.updateQuantity}
                      onRemove={cart.removeFromCart}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <motion.span
                    key={cart.total}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-orange-600"
                  >
                    {cart.total.toLocaleString()} FCFA
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-4 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-6">Finaliser la commande</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Numéro de téléphone</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                    placeholder="Ex: 07 00 00 00"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Mode de récupération</label>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setDeliveryOption('surPlace')}
                      className={`p-3 border rounded-md text-center transition-all duration-200 ${
                        deliveryOption === 'surPlace' 
                          ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-inner' 
                          : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Sur place
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setDeliveryOption('emporter')}
                      className={`p-3 border rounded-md text-center transition-all duration-200 ${
                        deliveryOption === 'emporter' 
                          ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-inner' 
                          : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      À emporter
                    </motion.button>
                  </div>
                </div>
                
                {deliveryOption === 'surPlace' && (
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Numéro de table</label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                      placeholder="Ex: Table 12"
                    />
                  </div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting 
                      ? 'bg-gray-500' 
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                  } text-white font-medium py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement...
                    </span>
                  ) : (
                    'Valider la commande'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default CartPage;