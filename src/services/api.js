// Simulate API calls
export const fetchMenu = async (establishmentId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          categories: [
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
                }
              ]
            }
          ]
        });
      }, 500);
    });
  };