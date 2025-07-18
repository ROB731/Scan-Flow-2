
import React, { createContext, useContext, useState, useEffect } from 'react';
const MenuContext = createContext();
export function MenuProvider({ children }) {
  // Données initiales pour les tests
  const initialCategories = [
    {
      id: 'cat1',
      name: 'Entrées',
      products: [
        {
          id: 'prod1',
          name: 'Salade César',
          description: 'Laitue romaine, croûtons, parmesan, sauce césar',
          price: 4500,
          allergens: 'Lait, gluten',
          image: null
        },
        {
          id: 'prod2',
          name: 'Bruschetta',
          description: 'Pain grillé, tomates, basilic, huile d\'olive',
          price: 3500,
          allergens: 'Gluten',
          image: null
        }
      ]
    },
    {
      id: 'cat2',
      name: 'Plats Principaux',
      products: [
        {
          id: 'prod3',
          name: 'Poulet Braisé',
          description: 'Poulet mariné, accompagné de plantain et attiéké',
          price: 7500,
          allergens: null,
          image: null
        },
        {
          id: 'prod4',
          name: 'Poisson Grillé',
          description: 'Capitaine grillé, sauce tomate, riz basmati',
          price: 8500,
          allergens: 'Poisson',
          image: null
        },
        {
          id: 'prod5',
          name: 'Pâtes Carbonara',
          description: 'Pâtes fraîches avec sauce crème, lardons et parmesan',
          price: 6500,
          allergens: 'Lait, gluten',
          image: null
        }
      ]
    },
    {
      id: 'cat3',
      name: 'Desserts',
      products: [
        {
          id: 'prod6',
          name: 'Tiramisu',
          description: 'Classique italien au café et mascarpone',
          price: 3000,
          allergens: 'Lait, œufs',
          image: null
        },
        {
          id: 'prod7',
          name: 'Mousse au Chocolat',
          description: 'Mousse légère au chocolat noir',
          price: 3500,
          allergens: 'Lait, œufs',
          image: null
        }
      ]
    },
    {
      id: 'cat4',
      name: 'Boissons',
      products: [
        {
          id: 'prod8',
          name: 'Jus d\'Ananas Frais',
          description: 'Pressé à la minute',
          price: 2500,
          allergens: null,
          image: null
        },
        {
          id: 'prod9',
          name: 'Café',
          description: 'Expresso ou allongé',
          price: 1500,
          allergens: null,
          image: null
        },
        {
          id: 'prod10',
          name: 'Eau Minérale',
          description: '50cl',
          price: 1000,
          allergens: null,
          image: null
        }
      ]
    }
  ];

  const [categories, setCategories] = useState(initialCategories);
  
  useEffect(() => {
    const savedMenu = localStorage.getItem('menu');
    if (savedMenu) {
      setCategories(JSON.parse(savedMenu));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('menu', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const updateCategory = (categoryId, updates) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, ...updates } : cat
    ));
  };
  const deleteCategory = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  const addProduct = (categoryId, product) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, products: [...cat.products, product] } 
        : cat
    ));
  };
  const updateProduct = (categoryId, productId, updates) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          products: cat.products.map(prod => 
            prod.id === productId ? { ...prod, ...updates } : prod
          )
        };
      }
      return cat;
    }));
  };
  const deleteProduct = (categoryId, productId) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          products: cat.products.filter(prod => prod.id !== productId)
        };
      }
      return cat;
    }));
  };

  return (
    <MenuContext.Provider value={{
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </MenuContext.Provider>
  );
}
export function useMenu() {
  return useContext(MenuContext);
}