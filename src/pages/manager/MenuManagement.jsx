import React, { useState } from 'react';
import { useMenu } from '../../contexts/MenuContext';
import ImageUploader from '../../components/ImageUploader';
import CategoryCard from '../../components/CategoryCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiChevronDown, FiChevronUp, FiSave, FiX } from 'react-icons/fi';

// Animations personnalisées
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "backOut" }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 15
    }
  }
};

const MenuManagement = () => {
  const menuContext = useMenu();
  
  // Vérifie si le contexte est disponible
  if (!menuContext) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-red-600">Erreur</h1>
        <p className="text-lg text-gray-700 mt-4">
          Le contexte du menu n'est pas disponible. Veuillez vérifier que le composant est bien enveloppé dans MenuProvider.
        </p>
      </motion.div>
    );
  }
  
  const { 
    categories, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    addProduct, 
    updateProduct, 
    deleteProduct 
  } = menuContext;
  
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    allergens: '',
    image: null
  });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory({
        id: Date.now().toString(),
        name: newCategory,
        products: []
      });
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  const handleAddProduct = () => {
    if (selectedCategory && newProduct.name.trim() && newProduct.price) {
      const product = {
        id: Date.now().toString(),
        ...newProduct,
        price: parseFloat(newProduct.price)
      };
      
      if (editingProduct) {
        updateProduct(selectedCategory.id, editingProduct.id, newProduct);
        setEditingProduct(null);
      } else {
        addProduct(selectedCategory.id, product);
      }
      
      setNewProduct({
        name: '',
        description: '',
        price: '',
        allergens: '',
        image: null
      });
    }
  };

  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setNewProduct({...newProduct, image: imageUrl});
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      allergens: product.allergens,
      image: product.image
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen"
    >
      <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-800"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200,
              delay: 0.1
            }}
          >
            Gestion du Menu
          </motion.h1>
          <motion.p 
            className="text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Créez et organisez votre menu avec élégance
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 md:mt-0"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-md font-medium"
            onClick={() => setIsAddingCategory(!isAddingCategory)}
          >
            <FiPlus className="mr-2" />
            Nouvelle Catégorie
          </motion.button>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne des catégories */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Catégories
            </h2>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {categories.length}
            </span>
          </div>
          
          <AnimatePresence>
            {isAddingCategory && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="flex">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nom de la nouvelle catégorie"
                    className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddCategory}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 rounded-r-lg"
                  >
                    Ajouter
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="space-y-4">
            <AnimatePresence>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <CategoryCard 
                    category={category}
                    onSelect={setSelectedCategory}
                    onUpdate={updateCategory}
                    onDelete={deleteCategory}
                    isSelected={selectedCategory?.id === category.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {categories.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune catégorie</h3>
                <p className="text-gray-500">Commencez par créer votre première catégorie</p>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Colonne des produits */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              {selectedCategory 
                ? `${selectedCategory.name}` 
                : 'Sélectionnez une catégorie'}
            </h2>
            {selectedCategory && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {selectedCategory.products.length} produits
              </span>
            )}
          </div>
          
          {selectedCategory ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  {editingProduct ? (
                    <>
                      <FiEdit className="mr-2 text-orange-500" />
                      Modifier le produit
                    </>
                  ) : (
                    <>
                      <FiPlus className="mr-2 text-green-500" />
                      Ajouter un produit
                    </>
                  )}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom du produit</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Ex: Pizza Margherita"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows="2"
                      placeholder="Description détaillée du produit..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prix (FCFA)</label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Ex: 4500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Allergènes</label>
                      <input
                        type="text"
                        value={newProduct.allergens}
                        onChange={(e) => setNewProduct({...newProduct, allergens: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Ex: Lait, gluten..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image du produit</label>
                    <ImageUploader onFileUpload={handleImageUpload} />
                    {newProduct.image && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 flex items-center"
                      >
                        <img 
                          src={newProduct.image} 
                          alt="Preview" 
                          className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300"
                        />
                        <button
                          onClick={() => setNewProduct({...newProduct, image: null})}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddProduct}
                      className={`flex-1 py-3 rounded-lg shadow-md font-medium ${
                        editingProduct 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500'
                      } text-white`}
                    >
                      {editingProduct ? 'Mettre à jour' : 'Ajouter le produit'}
                    </motion.button>
                    
                    {editingProduct && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setEditingProduct(null);
                          setNewProduct({
                            name: '',
                            description: '',
                            price: '',
                            allergens: '',
                            image: null
                          });
                        }}
                        className="py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium"
                      >
                        <FiX className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Produits existants
                </h3>
                
                {selectedCategory.products.length > 0 ? (
                  <div className="space-y-3">
                    <AnimatePresence>
                      {selectedCategory.products.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          whileHover={{ 
                            y: -3,
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                            backgroundColor: "#f9fafb"
                          }}
                          className="flex items-center justify-between p-4 rounded-xl border border-gray-200"
                        >
                          <div className="flex items-center">
                            {product.image ? (
                              <motion.div 
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                              >
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-16 h-16 object-cover rounded-lg mr-4"
                                />
                              </motion.div>
                            ) : (
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-gray-600 text-sm line-clamp-1">{product.description}</div>
                              <div className="mt-1 flex items-center">
                                <span className="font-bold text-orange-600">{product.price} FCFA</span>
                                {product.allergens && (
                                  <span className="text-xs text-gray-500 ml-3">• Allergènes: {product.allergens}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEditProduct(product)}
                              className={`text-blue-500 hover:text-blue-700 p-1 ${editingProduct?.id === product.id ? 'bg-blue-100 rounded-full p-2' : ''}`}
                            >
                              <FiEdit className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteProduct(selectedCategory.id, product.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun produit</h3>
                    <p className="text-gray-500">Ajoutez votre premier produit à cette catégorie</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-5 rounded-full mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Aucune catégorie sélectionnée</h3>
              <p className="text-gray-500 max-w-md">
                Veuillez sélectionner une catégorie à gauche pour gérer ses produits ou créer une nouvelle catégorie.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Éléments décoratifs flottants */}
      <motion.div 
        className="fixed top-0 left-0 w-40 h-40 rounded-full bg-orange-200 opacity-10 blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="fixed bottom-0 right-0 w-60 h-60 rounded-full bg-blue-200 opacity-10 blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

export default MenuManagement;