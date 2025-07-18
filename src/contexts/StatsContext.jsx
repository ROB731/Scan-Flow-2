// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { useOrders } from './OrderContext';

// const StatsContext = createContext();

// const initialState = {
//   popularItems: [],
//   weeklyRevenue: Array(7).fill(0).map((_, i) => ({ 
//     day: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][i], 
//     revenue: 0 
//   })),
//   totalRevenue: 0,
//   avgOrderValue: 0,
//   popularCategory: '',
//   monthlyTrends: [],
//   topCustomers: []
// };

// function statsReducer(state, action) {
//   switch (action.type) {
//     case 'ADD_ORDER':
//       return calculateStats(state, action.payload);
//     case 'RESET_MONTHLY':
//       return { ...initialState, topCustomers: state.topCustomers };
//     case 'UPDATE_TOP_CUSTOMERS':
//       return { ...state, topCustomers: action.payload };
//     default:
//       return state;
//   }
// }

// // Calcul des statistiques basées sur les commandes
// function calculateStats(state, order) {
//   const today = new Date().getDay();
  
//   // Mise à jour du revenu hebdomadaire
//   const weeklyRevenue = [...state.weeklyRevenue];
//   weeklyRevenue[today].revenue += order.total;
  
//   // Mise à jour des articles populaires
//   const popularItems = [...state.popularItems];
//   order.items.forEach(item => {
//     const existing = popularItems.find(i => i.name === item.name);
//     if (existing) {
//       existing.orders += item.quantity;
//     } else {
//       popularItems.push({ name: item.name, orders: item.quantity });
//     }
//   });
  
//   // Tri des articles populaires
//   popularItems.sort((a, b) => b.orders - a.orders);
  
//   // Calcul du revenu total
//   const totalRevenue = state.totalRevenue + order.total;
  
//   // Calcul de la valeur moyenne des commandes
//   const orderCount = state.orderCount + 1;
//   const avgOrderValue = totalRevenue / orderCount;
  
//   return {
//     ...state,
//     popularItems: popularItems.slice(0, 10),
//     weeklyRevenue,
//     totalRevenue,
//     avgOrderValue,
//     orderCount
//   };
// }

// export function StatsProvider({ children }) {
//   const [state, dispatch] = useReducer(statsReducer, initialState);
//   const { orders } = useOrders();

//   // Réinitialisation mensuelle le 5 du mois
//   useEffect(() => {
//     const today = new Date();
//     if (today.getDate() === 5) {
//       dispatch({ type: 'RESET_MONTHLY' });
//     }
//   }, []);

//   // Mise à jour des stats à chaque nouvelle commande
//   useEffect(() => {
//     orders.forEach(order => {
//       if (!order.processedForStats) {
//         dispatch({ type: 'ADD_ORDER', payload: order });
//         // Marquer la commande comme traitée pour les stats
//         order.processedForStats = true;
//       }
//     });
//   }, [orders]);

//   // Mise à jour des meilleurs clients
//   useEffect(() => {
//     const customerMap = new Map();
    
//     orders.forEach(order => {
//       if (!order.customerPhone) return;
      
//       const month = new Date(order.createdAt).getMonth();
//       const currentMonth = new Date().getMonth();
      
//       if (month === currentMonth) {
//         const key = `${order.customerName}|${order.customerPhone}`;
//         const customer = customerMap.get(key) || {
//           name: order.customerName,
//           phone: order.customerPhone,
//           amount: 0,
//           orders: 0
//         };
        
//         customer.amount += order.total;
//         customer.orders += 1;
//         customerMap.set(key, customer);
//       }
//     });
    
//     const topCustomers = Array.from(customerMap.values())
//       .sort((a, b) => b.amount - a.amount)
//       .slice(0, 100);
    
//     dispatch({ type: 'UPDATE_TOP_CUSTOMERS', payload: topCustomers });
//   }, [orders]);

//   return (
//     <StatsContext.Provider value={{ stats: state, dispatch }}>
//       {children}
//     </StatsContext.Provider>
//   );
// }

// export function useStats() {
//   return useContext(StatsContext);
// }


import { createContext, useContext, useState, useEffect } from 'react';
import { useOrders } from './OrderContext';
import { useMenu } from './MenuContext';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const { orders } = useOrders();
  const { categories } = useMenu();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    avgOrderValue: 0,
    popularCategory: '',
    popularProduct: '',
    monthlyRevenue: {},
    topCustomers: [],
    // Ajout des nouvelles propriétés
    establishments: 0,
    activeManagers: 0,
    newRegistrations: 0,
    settings: 0 // Nouvelle propriété pour les paramètres
  });

  useEffect(() => {
    calculateStats();
  }, [orders, categories]);

  const calculateStats = () => {
    let totalRevenue = 0;
    let completedOrders = 0;
    let productSales = {};
    let categorySales = {};
    let customerSpending = {};
    const monthlyRevenue = {};
    const now = new Date();
    
    orders.forEach(order => {
      if (order.status === 'completed') {
        totalRevenue += order.total;
        completedOrders++;
        
        const orderDate = new Date(order.createdAt);
        const monthYear = `${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;
        monthlyRevenue[monthYear] = (monthlyRevenue[monthYear] || 0) + order.total;
        
        customerSpending[order.customerPhone] = 
          (customerSpending[order.customerPhone] || 0) + order.total;
        
        order.items.forEach(item => {
          productSales[item.id] = (productSales[item.id] || 0) + item.quantity;
        });
      }
    });
    
    categories.forEach(category => {
      category.products.forEach(product => {
        if (productSales[product.id]) {
          categorySales[category.id] = (categorySales[category.id] || 0) + productSales[product.id];
        }
      });
    });
    
    const topCustomers = Object.entries(customerSpending)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([phone, amount]) => ({ phone, amount }));
    
    // Calculs des nouvelles métriques
    const establishments = categories.reduce((acc, category) => 
      acc + category.products.filter(p => p.isActive).length, 0);
    
    const activeManagers = orders.reduce((acc, order) => 
      order.managerId && !acc.includes(order.managerId) 
        ? [...acc, order.managerId] 
        : acc, []).length;
    
    const newRegistrations = orders.filter(order => 
      new Date(order.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;
    
    setStats({
      totalRevenue,
      avgOrderValue: completedOrders > 0 ? totalRevenue / completedOrders : 0,
      popularCategory: Object.keys(categorySales).length > 0 
        ? Object.keys(categorySales).reduce((a, b) => categorySales[a] > categorySales[b] ? a : b) 
        : '',
      popularProduct: Object.keys(productSales).length > 0 
        ? Object.keys(productSales).reduce((a, b) => productSales[a] > productSales[b] ? a : b) 
        : '',
      monthlyRevenue,
      topCustomers,
      // Mise à jour avec les nouvelles valeurs
      establishments,
      activeManagers,
      newRegistrations,
      settings: 0 // Valeur par défaut, à remplacer par vos données
    });
  };

  const getMonthlyRevenueData = () => {
    const labels = [];
    const data = [];
    const now = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getMonth() + 1}/${date.getFullYear()}`;
      labels.push(key);
      data.push(stats.monthlyRevenue[key] || 0);
    }
    
    return { labels, data };
  };

  return (
    <StatsContext.Provider value={{ stats, getMonthlyRevenueData }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  return useContext(StatsContext);
}