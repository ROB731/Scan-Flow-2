// import React, { useEffect, useState } from 'react';
// import StatCard from '../../components/StatCard';
// import StockAlert from '../../components/manager/StockAlert';
// import TopCustomers from '../../components/manager/TopCustomers';
// import { useStats } from '../../contexts/StatsContext';
// import { useOrders } from '../../contexts/OrderContext';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import { motion, AnimatePresence } from 'framer-motion';
// // import { useEstablishment } from '../../contexts/EstablishmentContext';

// // ID d'établissement fixe pour développement
// const establishmentId = 'default-establishment-id';

// const ManagerDashboard = () => {
//   const { 
//     stats = {}, 
//     fetchStats = () => {}, 
//     loading: statsLoading = false, 
//     error: statsError = null 
//   } = useStats();
  
//   const { 
//     orders = [], 
//     fetchRecentOrders = () => {}, 
//     loading: ordersLoading = false, 
//     error: ordersError = null 
//   } = useOrders();
  
//   const [loading, setLoading] = useState(true);
//   const [recentActivities, setRecentActivities] = useState([]);
  
//   // Effet pour charger les données
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Vérifier que les fonctions existent avant de les appeler
//         if (typeof fetchStats === 'function') {
//           await fetchStats(establishmentId);
//         }
//         if (typeof fetchRecentOrders === 'function') {
//           await fetchRecentOrders(establishmentId);
//         }
//       } finally {
//         // Simuler un délai pour voir les animations
//         setTimeout(() => setLoading(false), 800);
//       }
//     };
    
//     fetchData();
//   }, []);

//   // Générer les activités récentes
//   useEffect(() => {
//     if (orders.length > 0) {
//       const newActivities = orders.slice(0, 4).map(order => ({
//         id: order.id,
//         time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         action: `Nouvelle commande #${order.id}`,
//         user: order.table || 'À emporter'
//       }));
      
//       // Ajouter une activité système
//       newActivities.unshift({
//         id: 'system-activity',
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         action: 'Menu mis à jour',
//         user: 'Manager'
//       });
      
//       setRecentActivities(newActivities);
//     }
//   }, [orders]);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { 
//         type: "spring", 
//         stiffness: 120 
//       }
//     }
//   };

//   // Affichage pendant le chargement
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ 
//             scale: 1, 
//             opacity: 1,
//           }}
//           transition={{ 
//             type: "spring", 
//             stiffness: 300,
//             damping: 10,
//             duration: 0.5
//           }}
//         >
//           <LoadingSpinner size="lg" />
//         </motion.div>
//       </div>
//     );
//   }

//   // Gestion des erreurs
//   if (statsError || ordersError) {
//     return (
//       <motion.div 
//         className="min-h-screen flex items-center justify-center bg-gray-50"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
//           <motion.div
//             animate={{ 
//               scale: [1, 1.1, 1]
//             }}
//             transition={{ duration: 0.5 }}
//             className="text-5xl mb-4 text-red-500"
//           >
//             ❌
//           </motion.div>
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
//           <p className="mb-6 text-gray-600">
//             {statsError || ordersError || "Une erreur s'est produite lors du chargement des données"}
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md transition-all"
//             onClick={() => {
//               if (typeof fetchStats === 'function') {
//                 fetchStats(establishmentId);
//               }
//               if (typeof fetchRecentOrders === 'function') {
//                 fetchRecentOrders(establishmentId);
//               }
//               setLoading(true);
//             }}
//           >
//             Réessayer
//           </motion.button>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto px-4 py-8"
//     >
//       <motion.h1 
//         className="text-3xl md:text-4xl font-bold text-gray-800 mb-8"
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ 
//           type: "spring", 
//           stiffness: 200,
//           delay: 0.1
//         }}
//       >
//         Tableau de Bord Manager
//       </motion.h1>
      
//       {/* Alertes de stock */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mb-8"
//       >
//         <StockAlert establishmentId={establishmentId} />
//       </motion.div>
      
//       {/* Cartes de statistiques */}
//       <motion.div 
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {[
//           { 
//             title: "Commandes Aujourd'hui", 
//             value: stats.todayOrders || 0, 
//             icon: "📦",
//             color: "from-blue-500 to-blue-600"
//           },
//           { 
//             title: "En Attente", 
//             value: stats.pendingOrders || 0, 
//             icon: "⏱️",
//             color: "from-orange-500 to-orange-600"
//           },
//           { 
//             title: "Revenu (FCFA)", 
//             value: stats.todayRevenue ? stats.todayRevenue.toLocaleString() : '0', 
//             icon: "💰",
//             color: "from-green-500 to-green-600"
//           },
//           { 
//             title: "Produit Populaire", 
//             value: stats.popularProduct || 'Aucun', 
//             icon: "🔥",
//             color: "from-purple-500 to-purple-600"
//           }
//         ].map((stat, index) => (
//           <motion.div 
//             key={index} 
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <StatCard 
//               title={stat.title} 
//               value={stat.value} 
//               icon={stat.icon}
//               gradient={stat.color}
//             />
//           </motion.div>
//         ))}
//       </motion.div>
      
//       {/* Grille principale */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Commandes récentes */}
//         <motion.div 
//           className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">Commandes Récentes</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <AnimatePresence>
//                   {orders.slice(0, 4).map((order, index) => (
//                     <motion.tr 
//                       key={order.id}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ 
//                         opacity: 1, 
//                         height: "auto",
//                         transition: { delay: 0.5 + index * 0.1 } 
//                       }}
//                       exit={{ opacity: 0, height: 0 }}
//                       whileHover={{ backgroundColor: "#f9fafb" }}
//                       className="transition-colors duration-200"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         #{order.id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {order.table || 'À emporter'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {order.totalAmount?.toLocaleString() || '0'} FCFA
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <motion.span 
//                           className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             order.status === 'completed' ? 'bg-green-100 text-green-800' : 
//                             order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : 
//                             'bg-orange-100 text-orange-800'
//                           }`}
//                           whileHover={{ scale: 1.05 }}
//                         >
//                           {order.status === 'completed' ? 'Prête' : 
//                           order.status === 'preparing' ? 'En préparation' : 
//                           'En attente'}
//                         </motion.span>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
        
//         {/* Activité récente */}
//         <motion.div 
//           className="bg-white rounded-xl shadow-sm p-6"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">Activité Récente</h2>
//           <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
//             <AnimatePresence>
//               {recentActivities.map((activity, index) => (
//                 <motion.div
//                   key={`${activity.id}-${index}`}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ 
//                     opacity: 1, 
//                     x: 0,
//                     transition: { delay: 0.7 + index * 0.1 } 
//                   }}
//                   exit={{ opacity: 0, height: 0 }}
//                   whileHover={{ scale: 1.02 }}
//                   className="flex p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
//                 >
//                   <div className="mr-4">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow">
//                       <motion.span
//                         animate={{ rotate: 0 }}
//                         whileHover={{ rotate: 5 }}
//                         transition={{ duration: 0.3 }}
//                         className="text-orange-600"
//                       >
//                         📝
//                       </motion.span>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-800">{activity.action}</p>
//                     <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </motion.div>
//       </div>
      
//       {/* Top clients */}
//       <motion.div 
//         className="mt-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.8 }}
//       >
//         <TopCustomers />
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ManagerDashboard;










import React, { useEffect, useState } from 'react';
import StatCard from '../../components/StatCard';
import StockAlert from '../../components/manager/StockAlert';
import TopCustomers from '../../components/manager/TopCustomers';
import { useStats } from '../../contexts/StatsContext';
import { useOrders } from '../../contexts/OrderContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';

// ID d'établissement fixe pour développement
const establishmentId = 'default-establishment-id';

// Animations personnalisées
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerChildren = {
  visible: { 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "anticipate" }
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

const pulse = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      repeat: Infinity, 
      repeatType: "reverse", 
      duration: 1.5 
    } 
  }
};

const ManagerDashboard = () => {
  const { 
    stats = {}, 
    fetchStats = () => {}, 
    loading: statsLoading = false, 
    error: statsError = null 
  } = useStats();
  
  const { 
    orders = [], 
    fetchRecentOrders = () => {}, 
    loading: ordersLoading = false, 
    error: ordersError = null 
  } = useOrders();
  
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [hoveredOrder, setHoveredOrder] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  
  // Effet pour charger les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof fetchStats === 'function') {
          await fetchStats(establishmentId);
        }
        if (typeof fetchRecentOrders === 'function') {
          await fetchRecentOrders(establishmentId);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
          setStatsVisible(true);
        }, 800);
      }
    };
    
    fetchData();
  }, []);

  // Générer les activités récentes
  useEffect(() => {
    if (orders.length > 0) {
      const newActivities = orders.slice(0, 4).map(order => ({
        id: order.id,
        time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `Nouvelle commande #${order.id.substring(0, 6)}`,
        user: order.table || 'À emporter',
        icon: '📋'
      }));
      
      newActivities.unshift({
        id: 'system-activity',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: 'Menu mis à jour',
        user: 'Manager',
        icon: '📊'
      });
      
      setRecentActivities(newActivities);
    }
  }, [orders]);

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 10,
            duration: 0.5
          }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </motion.div>
          <motion.h1 
            className="mt-6 text-2xl font-bold text-gray-700"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Chargement du tableau de bord...
          </motion.h1>
        </motion.div>
      </div>
    );
  }

  // Gestion des erreurs
  if (statsError || ordersError) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{ duration: 1 }}
            className="text-5xl mb-4 text-red-500 inline-block"
          >
            ❌
          </motion.div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
          <p className="mb-6 text-gray-600">
            {statsError || ordersError || "Une erreur s'est produite lors du chargement des données"}
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-md font-medium"
            onClick={() => {
              if (typeof fetchStats === 'function') {
                fetchStats(establishmentId);
              }
              if (typeof fetchRecentOrders === 'function') {
                fetchRecentOrders(establishmentId);
              }
              setLoading(true);
            }}
          >
            Réessayer
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen"
    >
      {/* En-tête élégant avec animation */}
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
            Tableau de Bord Manager
          </motion.h1>
          <motion.p 
            className="text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Résumé des performances et activités de votre établissement
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
            className="flex items-center px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-700"
            onClick={() => {
              if (typeof fetchStats === 'function') fetchStats(establishmentId);
              if (typeof fetchRecentOrders === 'function') fetchRecentOrders(establishmentId);
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualiser les données
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Alertes de stock avec animation d'entrée */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-8"
      >
        <StockAlert establishmentId={establishmentId} />
      </motion.div>
      
      {/* Cartes de statistiques avec animation en cascade */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={staggerChildren}
        initial="hidden"
        animate={statsVisible ? "visible" : "hidden"}
      >
        {[
          { 
            title: "Commandes Aujourd'hui", 
            value: stats.todayOrders || 0, 
            icon: "📦",
            color: "blue",
            delay: 0.1
          },
          { 
            title: "En Attente", 
            value: stats.pendingOrders || 0, 
            icon: "⏱️",
            color: "orange",
            delay: 0.2
          },
          { 
            title: "Revenu (FCFA)", 
            value: stats.todayRevenue ? stats.todayRevenue.toLocaleString() : '0', 
            icon: "💰",
            color: "green",
            delay: 0.3
          },
          { 
            title: "Produit Populaire", 
            value: stats.popularProduct || 'Aucun', 
            icon: "🔥",
            color: "purple",
            delay: 0.4
          }
        ].map((stat, index) => (
          <motion.div 
            key={index} 
            variants={scaleUp}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatCard 
              title={stat.title} 
              value={stat.value} 
              icon={stat.icon}
              color={stat.color}
              animated={true}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Grille principale avec animations synchronisées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Commandes récentes avec effets de survol */}
        <motion.div 
          className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Commandes Récentes
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {orders.slice(0, 4).map((order, index) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: 1, 
                        height: "auto",
                        transition: { delay: 0.5 + index * 0.1 } 
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                      onMouseEnter={() => setHoveredOrder(order.id)}
                      onMouseLeave={() => setHoveredOrder(null)}
                      className="transition-all duration-300 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${order.status === 'completed' ? 'bg-green-500' : order.status === 'preparing' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">#{order.id.substring(0, 8)}</div>
                            <div className="text-sm text-gray-500">{order.items.length} articles</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.table || 'À emporter'}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.totalAmount?.toLocaleString() || '0'} FCFA
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.span 
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : 
                            'bg-orange-100 text-orange-800'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          animate={{
                            boxShadow: hoveredOrder === order.id ? "0 0 0 3px rgba(245, 158, 11, 0.3)" : "none"
                          }}
                        >
                          {order.status === 'completed' ? 'Prête' : 
                          order.status === 'preparing' ? 'En préparation' : 
                          'En attente'}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {orders.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune commande récente</h3>
              <p className="text-gray-500">Aucune commande n'a été passée aujourd'hui</p>
            </div>
          )}
        </motion.div>
        
        {/* Activité récente avec animations de bulles */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Activité Récente
            </h2>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={`${activity.id}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: 0.7 + index * 0.1 } 
                  }}
                  exit={{ opacity: 0, height: 0 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)"
                  }}
                  className="flex p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer mb-3 border border-gray-100"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                    className="mr-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow">
                      <span className="text-xl">{activity.icon}</span>
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-500">{activity.user}</p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {recentActivities.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune activité récente</h3>
                <p className="text-gray-500">Les activités apparaîtront ici</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Top clients avec animation d'entrée */}
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <TopCustomers />
      </motion.div>
      
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

export default ManagerDashboard;
