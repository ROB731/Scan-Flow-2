
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useOrders } from '../../contexts/OrderContext';
// import OrderStatusBadge from '../../components/OrderStatusBadge';

// const OrderTrackingPage = () => {
//   const { orderId } = useParams();
//   const { orders } = useOrders();
//   const [order, setOrder] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [estimatedTime, setEstimatedTime] = useState(20);
//   const [timeLeft, setTimeLeft] = useState(estimatedTime * 60);
  
//   useEffect(() => {
//     const foundOrder = orders.find(o => o.id === orderId);
//     if (foundOrder) {
//       setOrder(foundOrder);
//       let progressValue = 0;
//       switch(foundOrder.status) {
//         case 'pending': progressValue = 25; break;
//         case 'preparation': progressValue = 50; break;
//         case 'ready': progressValue = 75; break;
//         case 'completed': progressValue = 100; break;
//         default: progressValue = 0;
//       }
//       setProgress(progressValue);
//     }
//   }, [orderId, orders]);

//   useEffect(() => {
//     if (progress < 100) {
//       const timer = setInterval(() => {
//         setTimeLeft(prev => Math.max(0, prev - 1));
//       }, 1000);
      
//       return () => clearInterval(timer);
//     }
//   }, [progress]);

//   if (!order) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Commande non trouvée</h2>
//           <p className="text-gray-600">La commande avec l'ID {orderId} n'existe pas</p>
//         </div>
//       </div>
//     );
//   }
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };
//   return (
//     <div className="container mx-auto px-4 py-8 max-w-2xl">
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Suivi de votre commande</h1>
//           <p className="text-gray-600">ID: {order.id}</p>
//         </div>
        
//         <div className="mb-8">
//           <div className="flex justify-between mb-2">
//             <span className="font-medium">Statut:</span>
//             <OrderStatusBadge status={order.status} />
//           </div>
          
//           <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
//             <div 
//               className="bg-orange-600 h-4 rounded-full transition-all duration-500 ease-in-out"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
          
//           <div className="grid grid-cols-4 text-xs text-gray-600">
//             <div className="text-center">Reçue</div>
//             <div className="text-center">En préparation</div>
//             <div className="text-center">Prêtes</div>
//             <div className="text-center">Terminées</div>
//           </div>
//         </div>
        
//         <div className="mb-8 p-4 bg-orange-50 rounded-lg">
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="font-medium text-gray-800">Temps estimé</h3>
//               <p className="text-gray-600">{estimatedTime} minutes</p>
//             </div>
//             <div className="text-2xl font-bold">
//               {formatTime(timeLeft)}
//             </div>
//           </div>
//         </div>
        
//         <div className="mb-6">
//           <h3 className="font-medium text-gray-800 mb-3">Récapitulatif</h3>
//           <div className="space-y-2">
//             {order.items.map((item, index) => (
//               <div key={index} className="flex justify-between">
//                 <span>
//                   {item.quantity} x {item.name}
//                   {item.options.length > 0 && (
//                     <span className="text-gray-600 text-sm ml-2">
//                       ({item.options.map(opt => opt.name).join(', ')})
//                     </span>
//                   )}
//                 </span>
//                 <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
//               </div>
//             ))}
//           </div>
//           <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-bold">
//             <span>Total:</span>
//             <span>{order.total.toLocaleString()} FCFA</span>
//           </div>
//         </div>
        
//         <div className="bg-gray-50 rounded-lg p-4">
//           <h3 className="font-medium text-gray-800 mb-2">Informations</h3>
//           <p><span className="text-gray-600">Nom:</span> {order.customerName}</p>
//           <p><span className="text-gray-600">Téléphone:</span> {order.customerPhone}</p>
//           <p>
//             <span className="text-gray-600">Mode:</span> 
//             {order.deliveryOption === 'surPlace' ? ' Sur place' : ' À emporter'}
//           </p>
//           {order.deliveryOption === 'surPlace' && (
//             <p><span className="text-gray-600">Table:</span> {order.tableNumber}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default OrderTrackingPage;











import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrders } from '../../contexts/OrderContext';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { motion } from 'framer-motion';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { orders } = useOrders();
  const [order, setOrder] = useState(null);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(20);
  const [timeLeft, setTimeLeft] = useState(estimatedTime * 60);
  
  useEffect(() => {
    const foundOrder = orders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      let progressValue = 0;
      switch(foundOrder.status) {
        case 'pending': progressValue = 25; break;
        case 'preparation': progressValue = 50; break;
        case 'ready': progressValue = 75; break;
        case 'completed': progressValue = 100; break;
        default: progressValue = 0;
      }
      setProgress(progressValue);
    }
  }, [orderId, orders]);

  useEffect(() => {
    let timer;
    if (progress < 100) {
      timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [progress]);

  if (!order) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Commande non trouvée</h2>
          <p className="text-gray-600">La commande avec l'ID {orderId} n'existe pas</p>
        </div>
      </motion.div>
    );
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-2xl"
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Suivi de votre commande</h1>
          <p className="text-gray-600">ID: {order.id}</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Statut:</span>
            <OrderStatusBadge status={order.status} />
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-4 rounded-full"
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-4 text-xs text-gray-600">
            <div className="text-center">Reçue</div>
            <div className="text-center">En préparation</div>
            <div className="text-center">Prête</div>
            <div className="text-center">Terminée</div>
          </div>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">Temps estimé</h3>
              <p className="text-gray-600">{estimatedTime} minutes</p>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {formatTime(timeLeft)}
            </div>
          </div>
        </motion.div>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-3">Récapitulatif</h3>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between"
              >
                <span>
                  {item.quantity} x {item.name}
                  {item.options.length > 0 && (
                    <span className="text-gray-600 text-sm ml-2">
                      ({item.options.map(opt => opt.name).join(', ')})
                    </span>
                  )}
                </span>
                <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-bold">
            <span>Total:</span>
            <span>{order.total.toLocaleString()} FCFA</span>
          </div>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <h3 className="font-medium text-gray-800 mb-2">Informations</h3>
          <p><span className="text-gray-600">Nom:</span> {order.customerName}</p>
          <p><span className="text-gray-600">Téléphone:</span> {order.customerPhone}</p>
          <p>
            <span className="text-gray-600">Mode:</span> 
            {order.deliveryOption === 'surPlace' ? ' Sur place' : ' À emporter'}
          </p>
          {order.deliveryOption === 'surPlace' && (
            <p><span className="text-gray-600">Table:</span> {order.tableNumber}</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OrderTrackingPage;