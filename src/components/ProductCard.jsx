
// import React, { useState } from 'react'; // Ajout de useState dans l'import
// import { Link } from 'react-router-dom';
// const ProductCard = ({ product, onAddToCart }) => {
//   const [quantity, setQuantity] = useState(1);
//   const handleAddToCart = () => {
//     onAddToCart(product, quantity);
//     setQuantity(1);
//   };
//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:shadow-md hover:-translate-y-1">
//       {product.image ? (
//         <img 
//           src={product.image} 
//           alt={product.name} 
//           className="w-full h-48 object-cover"
//         />
//       ) : (
//         <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
//           <span className="text-gray-500">Pas d'image</span>
//         </div>
//       )}
      
//       <div className="p-4">
//         <div className="flex justify-between items-start">
//           <Link to={`/product/${product.id}`} className="block">
//             <h3 className="font-semibold text-lg mb-1 hover:text-orange-600 transition">
//               {product.name}
//             </h3>
//           </Link>
//           <span className="font-bold text-orange-600 whitespace-nowrap">
//             {product.price.toLocaleString()} FCFA
//           </span>
//         </div>
        
//         <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//           {product.description}
//         </p>
        
//         {product.allergens && (
//           <div className="text-xs text-gray-500 mb-3">
//             <span className="font-medium">Allergènes:</span> {product.allergens}
//           </div>
//         )}
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center border border-gray-300 rounded-md">
//             <button
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               className="px-3 py-1 text-gray-600 hover:bg-gray-100"
//             >
//               -
//             </button>
//             <span className="px-3 py-1">{quantity}</span>
//             <button
//               onClick={() => setQuantity(quantity + 1)}
//               className="px-3 py-1 text-gray-600 hover:bg-gray-100"
//             >
//               +
//             </button>
//           </div>
          
//           <button
//             onClick={handleAddToCart}
//             className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-4 rounded-md transition flex items-center"
//           >
//             <span className="mr-1">+</span> Ajouter
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProductCard;







import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition">
      <div className="relative">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover cursor-pointer"
            onClick={() => setShowDetails(true)}
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
            <span className="text-gray-500">Pas d'image</span>
          </div>
        )}
        <button
          onClick={() => setShowDetails(true)}
          className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800">{product.name}</h3>
          <span className="font-bold text-orange-600">{product.price.toLocaleString()} FCFA</span>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 h-12 overflow-hidden">
          {product.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => onAddToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-1 px-3 rounded"
          >
            Ajouter
          </button>
          
          <button 
            onClick={() => setShowDetails(true)}
            className="text-orange-500 hover:text-orange-700 text-sm flex items-center"
          >
            Détails
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Product Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              {product.ingredients && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Ingrédients:</h4>
                  <p className="text-gray-600">{product.ingredients}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-6">
                <span className="text-xl font-bold text-orange-600">
                  {product.price.toLocaleString()} FCFA
                </span>
                <button
                  onClick={() => {
                    onAddToCart(product);
                    setShowDetails(false);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;