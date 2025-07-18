
// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { useMenu } from '../../contexts/MenuContext';
// import { useCart } from '../../contexts/CartContext';
// import CategoryCard from '../../components/CategoryCard';
// import ProductCard from '../../components/ProductCard';
// import LoadingSpinner from '../../components/LoadingSpinner';
// const MenuPage = () => {
//   const { establishmentId } = useParams();
//   const { categories } = useMenu();
//   const { addToCart } = useCart();
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   useEffect(() => {
//     if (categories.length > 0) {
//       setSelectedCategory(categories[0]);
//     }
//   }, [categories]);
//   const filteredProducts = selectedCategory
//     ? selectedCategory.products.filter(product => 
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];
//   if (categories.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Menu du Restaurant</h1>
//         <p className="text-gray-600">Sélectionnez vos plats préférés</p>
//       </div>
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Rechercher un plat, une boisson..."
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
//             <h2 className="text-lg font-semibold mb-4">Catégories</h2>
//             <div className="space-y-3">
//               {categories.map(category => (
//                 <CategoryCard
//                   key={category.id}
//                   category={category}
//                   onSelect={setSelectedCategory}
//                   isSelected={selectedCategory?.id === category.id}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="lg:col-span-3">
//           {selectedCategory && (
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedCategory.name}</h2>
//               {filteredProducts.length === 0 ? (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500">Aucun produit trouvé dans cette catégorie</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredProducts.map(product => (
//                     <ProductCard
//                       key={product.id}
//                       product={product}
//                       onAddToCart={addToCart}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MenuPage;






import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useMenu } from '../../contexts/MenuContext';
import { useCart } from '../../contexts/CartContext';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const MenuPage = () => {
  const { establishmentId } = useParams();
  const { categories } = useMenu();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
      setFilteredCategories(categories);
    }
  }, [categories]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = categories.map(cat => ({
        ...cat,
        products: cat.products.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) // Correction ici: parenthèse fermante ajoutée
      })).filter(cat => cat.products.length > 0);
      
      setFilteredCategories(filtered);
      if (filtered.length > 0) setSelectedCategory(filtered[0]);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  if (categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Notre Menu</h1>
        <p className="text-gray-600">Découvrez nos spécialités</p>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un plat, une boisson..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Catégories</h2>
            <div className="space-y-3">
              {filteredCategories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onSelect={setSelectedCategory}
                  isSelected={selectedCategory?.id === category.id}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {selectedCategory && (
            <div>
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedCategory.name}</h2>
                <p className="text-orange-100 mt-2">Découvrez nos spécialités dans cette catégorie</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCategory.products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;