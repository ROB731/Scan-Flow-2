
// import React, { createContext, useContext, useState, useEffect } from 'react';
// const OrderContext = createContext();
// export function OrderProvider({ children }) {
//   const initialOrders = [
//     {
//       id: 'CMD-1001',
//       items: [
//         { 
//           id: 'prod3', 
//           name: 'Poulet Braisé', 
//           price: 7500, 
//           quantity: 2,
//           options: [],
//           notes: ''
//         }
//       ],
//       total: 15000,
//       customerName: 'Jean Dupont',
//       customerPhone: '07 12 34 56',
//       tableNumber: 'Table 5',
//       deliveryOption: 'surPlace',
//       status: 'pending',
//       createdAt: new Date(Date.now() - 3600000).toISOString()
//     },
//     {
//       id: 'CMD-1002',
//       items: [
//         { 
//           id: 'prod1', 
//           name: 'Salade César', 
//           price: 4500, 
//           quantity: 1,
//           options: [],
//           notes: 'Sans croûtons'
//         },
//         { 
//           id: 'prod6', 
//           name: 'Tiramisu', 
//           price: 3000, 
//           quantity: 1,
//           options: [],
//           notes: ''
//         }
//       ],
//       total: 7500,
//       customerName: 'Marie Koné',
//       customerPhone: '05 67 89 10',
//       tableNumber: '',
//       deliveryOption: 'emporter',
//       status: 'preparation',
//       createdAt: new Date(Date.now() - 1800000).toISOString()
//     }
//   ];
//   const [orders, setOrders] = useState(initialOrders);
//   const [nextOrderId, setNextOrderId] = useState(1003);
//   useEffect(() => {
//     const savedOrders = localStorage.getItem('orders');
//     if (savedOrders) {
//       setOrders(JSON.parse(savedOrders));
//     }
//     const savedOrderId = localStorage.getItem('nextOrderId');
//     if (savedOrderId) {
//       setNextOrderId(parseInt(savedOrderId, 10));
//     }
//   }, []);
//   useEffect(() => {
//     localStorage.setItem('orders', JSON.stringify(orders));
//     localStorage.setItem('nextOrderId', nextOrderId.toString());
//   }, [orders, nextOrderId]);
//   const placeOrder = (orderData) => {
//     const newOrder = {
//       id: `CMD-${nextOrderId}`,
//       ...orderData,
//       status: 'pending',
//       createdAt: new Date().toISOString()
//     };
//     setOrders([newOrder, ...orders]);
//     setNextOrderId(nextOrderId + 1);
//     return newOrder;
//   };
//   const updateOrderStatus = (orderId, newStatus) => {
//     setOrders(orders.map(order => 
//       order.id === orderId ? { ...order, status: newStatus } : order
//     ));
//   };
//   return (
//     <OrderContext.Provider value={{
//       orders,
//       placeOrder,
//       updateOrderStatus
//     }}>
//       {children}
//     </OrderContext.Provider>
//   );
// }
// export function useOrders() {
//   return useContext(OrderContext);
// }











// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useStock } from './StockContext';
// const OrderContext = createContext();
// export function OrderProvider({ children }) {
//   const [orders, setOrders] = useState([]);
//   const [nextOrderId, setNextOrderId] = useState(1001);
//   const { updateStock } = useStock();

//   useEffect(() => {
//     const savedOrders = localStorage.getItem('orders');
//     if (savedOrders) {
//       setOrders(JSON.parse(savedOrders));
//     }
//     const savedOrderId = localStorage.getItem('nextOrderId');
//     if (savedOrderId) {
//       setNextOrderId(parseInt(savedOrderId, 10));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('orders', JSON.stringify(orders));
//     localStorage.setItem('nextOrderId', nextOrderId.toString());
//   }, [orders, nextOrderId]);

//   const placeOrder = (orderData) => {
//     const newOrder = {
//       id: `CMD-${nextOrderId}`,
//       ...orderData,
//       status: 'pending',
//       createdAt: new Date().toISOString(),
//       processedForStats: false
//     };
    
//     setOrders([newOrder, ...orders]);
//     setNextOrderId(nextOrderId + 1);
    
//     // Mettre à jour le stock
//     orderData.items.forEach(item => {
//       updateStock(item.id, -item.quantity);
//     });
    
//     return newOrder;
//   };

//   const updateOrderStatus = (orderId, newStatus) => {
//     setOrders(orders.map(order => 
//       order.id === orderId ? { ...order, status: newStatus } : order
//     ));
//   };

//   return (
//     <OrderContext.Provider value={{
//       orders,
//       placeOrder,
//       updateOrderStatus
//     }}>
//       {children}
//     </OrderContext.Provider>
//   );
// }
// export function useOrders() {
//   return useContext(OrderContext);
// }


import React, { createContext, useState, useContext, useEffect } from 'react';
const OrderContext = createContext();
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchRecentOrders = async (establishmentId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/orders/recent?establishment=${establishmentId}`);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }
  
      if (!response.ok) throw new Error('Erreur serveur');
      
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
      console.error('Erreur fetchRecentOrders:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      fetchRecentOrders, 
      loading, 
      error 
    }}>
      {children}
    </OrderContext.Provider>
  );
};
export const useOrders = () => useContext(OrderContext);