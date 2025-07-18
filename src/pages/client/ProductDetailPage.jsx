// import React, { useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useMenu } from '../../contexts/MenuContext';
// import { useCart } from '../../contexts/CartContext';
// import { motion, AnimatePresence } from 'framer-motion';

// const ProductDetailPage = () => {
//   const { productId } = useParams();
//   const { categories } = useMenu();
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
  
//   const [quantity, setQuantity] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [notes, setNotes] = useState('');
//   const [message, setMessage] = useState({ show: false, text: '', type: '' });
  
//   // Find product
//   let product = null;
//   for (const category of categories) {
//     product = category.products.find(p => p.id === productId);
//     if (product) break;
//   }
  
//   const showMessage = (text, type) => {
//     setMessage({ show: true, text, type });
//     setTimeout(() => setMessage({ show: false, text: '', type: '' }), 3000);
//   };

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h2>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate(-1)}
//             className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-md shadow-md"
//           >
//             Retour au menu
//           </motion.button>
//         </div>
//       </div>
//     );
//   }
  
//   const availableOptions = [
//     { id: 'opt1', name: 'Extra fromage', price: 500 },
//     { id: 'opt2', name: 'Sans gluten', price: 0 },
//     { id: 'opt3', name: 'Viande bien cuite', price: 0 },
//     { id: 'opt4', name: 'Sauce supplémentaire', price: 300 }
//   ];
  
//   const toggleOption = (option) => {
//     if (selectedOptions.some(opt => opt.id === option.id)) {
//       setSelectedOptions(selectedOptions.filter(opt => opt.id !== option.id));
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };
  
//   const handleAddToCart = () => {
//     if (quantity < 1) {
//       showMessage('Veuillez sélectionner une quantité', 'error');
//       return;
//     }
    
//     addToCart(product, quantity, selectedOptions, notes);
//     showMessage('Produit ajouté au panier!', 'success');
    
//     setTimeout(() => {
//       navigate('/cart');
//     }, 1500);
//   };
  
//   const totalPrice = (product.price + selectedOptions.reduce((sum, opt) => sum + opt.price, 0)) * quantity;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto px-4 py-8 max-w-4xl"
//     >
//       <AnimatePresence>
//         {message.show && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
//               message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
//             } text-white flex items-center`}
//           >
//             <span>{message.text}</span>
//             <motion.button 
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setMessage({...message, show: false})}
//               className="ml-4 text-xl"
//             >
//               ×
//             </motion.button>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => navigate(-1)}
//         className="flex items-center text-orange-600 mb-6 group"
//       >
//         <motion.span 
//           whileHover={{ x: -5 }}
//           className="mr-2 group-hover:text-orange-800 transition-colors"
//         >
//           ←
//         </motion.span> 
//         <span className="group-hover:text-orange-800 transition-colors">Retour au menu</span>
//       </motion.button>
      
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="bg-white rounded-xl shadow-lg overflow-hidden"
//       >
//         <div className="md:flex">
//           <div className="md:w-1/2">
//             {product.image ? (
//               <img 
//                 src={product.image} 
//                 alt={product.name} 
//                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//               />
//             ) : (
//               <div className="bg-gray-200 border-2 border-dashed w-full h-64 md:h-full flex items-center justify-center">
//                 <span className="text-gray-500">Pas d'image</span>
//               </div>
//             )}
//           </div>
          
//           <div className="md:w-1/2 p-6">
//             <motion.h1 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-3xl font-bold text-gray-800 mb-2"
//             >
//               {product.name}
//             </motion.h1>
            
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="text-2xl font-bold text-orange-600 mb-4"
//             >
//               {totalPrice.toLocaleString()} FCFA
//               {selectedOptions.length > 0 && (
//                 <span className="text-base text-gray-500 ml-2">
//                   (dont {selectedOptions.reduce((sum, opt) => sum + opt.price, 0).toLocaleString()} FCFA d'options)
//                 </span>
//               )}
//             </motion.div>
            
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="text-gray-600 mb-6"
//             >
//               {product.description}
//             </motion.p>
            
//             {product.allergens && (
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//                 className="mb-6"
//               >
//                 <h3 className="font-medium text-gray-700 mb-2">Allergènes</h3>
//                 <p className="text-gray-600">{product.allergens}</p>
//               </motion.div>
//             )}
            
//             {availableOptions.length > 0 && (
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.7 }}
//                 className="mb-6"
//               >
//                 <h3 className="font-medium text-gray-700 mb-3">Options</h3>
//                 <div className="space-y-2">
//                   {availableOptions.map(option => (
//                     <motion.label 
//                       key={option.id}
//                       whileHover={{ y: -3 }}
//                       className={`flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${
//                         selectedOptions.some(opt => opt.id === option.id)
//                           ? 'border-orange-500 bg-orange-50 shadow-inner'
//                           : 'border-gray-200 hover:bg-gray-50'
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedOptions.some(opt => opt.id === option.id)}
//                         onChange={() => toggleOption(option)}
//                         className="h-5 w-5 text-orange-600 rounded focus:ring-orange-500"
//                       />
//                       <span className="ml-3 flex-grow">{option.name}</span>
//                       {option.price > 0 && (
//                         <span className="text-orange-600 font-medium">+{option.price.toLocaleString()} FCFA</span>
//                       )}
//                     </motion.label>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
            
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8 }}
//               className="mb-6"
//             >
//               <label className="block font-medium text-gray-700 mb-2">
//                 Notes spéciales
//               </label>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="Ex: Sans oignons, sauce à part..."
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
//                 rows="2"
//               />
//             </motion.div>
            
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.9 }}
//               className="flex items-center justify-between"
//             >
//               <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
//                 <motion.button
//                   whileHover={{ backgroundColor: "#f3f4f6" }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   -
//                 </motion.button>
//                 <span className="px-4 py-2 font-medium">{quantity}</span>
//                 <motion.button
//                   whileHover={{ backgroundColor: "#f3f4f6" }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   +
//                 </motion.button>
//               </div>
              
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleAddToCart}
//                 className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium py-2 px-6 rounded-md shadow-md transition-all duration-300"
//               >
//                 Ajouter au panier
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ProductDetailPage;













import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '../../contexts/MenuContext';
import { useCart } from '../../contexts/CartContext';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { categories } = useMenu();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [notes, setNotes] = useState('');
  const [showZoom, setShowZoom] = useState(false);
  
  // Trouver le produit dans toutes les catégories
  let product = null;
  for (const category of categories) {
    product = category.products.find(p => p.id === productId);
    if (product) break;
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md"
          >
            Retour au menu
          </button>
        </div>
      </div>
    );
  }
  
  const availableOptions = [
    { id: 'opt1', name: 'Extra fromage', price: 500 },
    { id: 'opt2', name: 'Sans gluten', price: 0 },
    { id: 'opt3', name: 'Viande bien cuite', price: 0 },
    { id: 'opt4', name: 'Sauce supplémentaire', price: 300 },
    { id: 'opt5', name: 'Piment supplémentaire', price: 200 },
    { id: 'opt6', name: 'Sans oignons', price: 0 }
  ];
  
  const toggleOption = (option) => {
    if (selectedOptions.some(opt => opt.id === option.id)) {
      setSelectedOptions(selectedOptions.filter(opt => opt.id !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOptions, notes);
    navigate('/cart');
  };
  
  const totalPrice = (product.price + selectedOptions.reduce((sum, opt) => sum + opt.price, 0)) * quantity;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-orange-600 mb-6"
      >
        <span className="mr-2">←</span> Retour au menu
      </button>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative">
            {product.image ? (
              <>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setShowZoom(true)}
                />
                
                {showZoom && (
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowZoom(false)}
                  >
                    <div className="max-w-4xl w-full">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain max-h-[80vh]"
                      />
                      <button
                        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
                        onClick={() => setShowZoom(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gray-200 border-2 border-dashed w-full h-64 md:h-full flex items-center justify-center">
                <span className="text-gray-500">Pas d'image</span>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="text-2xl font-bold text-orange-600 mb-4">
              {totalPrice.toLocaleString()} FCFA
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {product.allergens && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Allergènes</h3>
                <p className="text-gray-600">{product.allergens}</p>
              </div>
            )}
            
            {availableOptions.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Options personnalisées</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {availableOptions.map(option => (
                    <label 
                      key={option.id}
                      className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        selectedOptions.some(opt => opt.id === option.id)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.some(opt => opt.id === option.id)}
                        onChange={() => toggleOption(option)}
                        className="h-5 w-5 text-orange-600 rounded"
                      />
                      <span className="ml-3 flex-grow">{option.name}</span>
                      {option.price > 0 && (
                        <span className="text-orange-600">+{option.price.toLocaleString()} FCFA</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">
                Notes spéciales pour le chef
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Sans oignons, sauce à part, piment modéré..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="2"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Ajouter ({totalPrice.toLocaleString()} FCFA)
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-orange-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-orange-800 mb-4">Détails du plat</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-orange-700 mb-2">Ingrédients</h3>
            <p className="text-gray-700">
              {product.ingredients || "Grains de qualité supérieure, piment frais, ail local, oignons rouges, épices sélectionnées, huile d'olive"}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-orange-700 mb-2">Préparation</h3>
            <p className="text-gray-700">
              {product.preparation || "Cuisson lente traditionnelle au feu de bois, assaisonnement parfait avec des herbes fraîches, présentation soignée par notre chef"}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-orange-700 mb-2">Accompagnements</h3>
            <p className="text-gray-700">
              {product.sides || "Sauce piquante maison, légumes frais de saison, plantains frites croustillantes, avocat crémeux"}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-orange-700 mb-2">Conseil du chef</h3>
            <p className="text-gray-700">
              {product.chefTip || "Dégustez avec notre jus de bissap frais pour une expérience gustative authentique. Essayez avec un peu de piment pour relever les saveurs !"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="bg-gray-200 border-2 border-dashed w-full h-32" />
            <div className="p-3">
              <p className="text-sm text-gray-600">Vue {item} du plat</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;