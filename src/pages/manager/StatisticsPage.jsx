
// import React from 'react';
// import StatCard from '../../components/StatCard';

// const StatisticsPage = () => {
//   // Données statistiques simulées
//   const stats = {
//     totalRevenue: 1250000,
//     avgOrderValue: 12500,
//     popularCategory: 'Plats Principaux',
//     busiestTime: '12:30 - 14:00'
//   };
  
//   const revenueData = [
//     { day: 'Lun', revenue: 175000 },
//     { day: 'Mar', revenue: 210000 },
//     { day: 'Mer', revenue: 190000 },
//     { day: 'Jeu', revenue: 230000 },
//     { day: 'Ven', revenue: 285000 },
//     { day: 'Sam', revenue: 160000 },
//     { day: 'Dim', revenue: 0 }
//   ];
  
//   const popularItems = [
//     { name: 'Poulet Braisé', orders: 142 },
//     { name: 'Pizza Royale', orders: 128 },
//     { name: 'Salade César', orders: 98 },
//     { name: 'Jus d\'Ananas Frais', orders: 210 },
//     { name: 'Tiramisu', orders: 86 }
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Statistiques</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <StatCard 
//           title="Revenu Total (FCFA)" 
//           value={stats.totalRevenue.toLocaleString()} 
//           icon="💰"
//           color="green"
//         />
//         <StatCard 
//           title="Commande Moyenne" 
//           value={stats.avgOrderValue.toLocaleString() + ' FCFA'} 
//           icon="📊"
//           color="blue"
//         />
//         <StatCard 
//           title="Catégorie Populaire" 
//           value={stats.popularCategory} 
//           icon="🏆"
//           color="orange"
//         />
//         <StatCard 
//           title="Heure d'Affluence" 
//           value={stats.busiestTime} 
//           icon="⏱️"
//           color="purple"
//         />
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Revenu Hebdomadaire</h2>
//           <div className="flex items-end h-64 space-x-2 mt-8">
//             {revenueData.map((day, index) => (
//               <div key={day.day} className="flex flex-col items-center flex-grow">
//                 <div className="text-xs text-gray-500 mb-2">{day.day}</div>
//                 <div 
//                   className="w-full bg-orange-500 rounded-t-md transition-all duration-500"
//                   style={{ height: `${(day.revenue / 300000) * 100}%` }}
//                 ></div>
//                 <div className="text-xs mt-2">{day.revenue > 0 ? `${(day.revenue/1000).toFixed(0)}K` : ''}</div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Articles Populaires</h2>
//           <div className="space-y-4">
//             {popularItems.map((item, index) => (
//               <div key={item.name}>
//                 <div className="flex justify-between mb-1">
//                   <span>{item.name}</span>
//                   <span>{item.orders} commandes</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-orange-500 h-2 rounded-full"
//                     style={{ width: `${(item.orders / 250) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">Tendances Mensuelles</h2>
//         <div className="text-center py-12 text-gray-500">
//           Graphique des tendances mensuelles à venir...
//         </div>
//       </div>
//     </div>
//   );
// };
// export default StatisticsPage;







import React, { useEffect, useState } from 'react';
import { useStats } from '../../contexts/StatsContext';
import RevenueChart from '../../components/common/RevenueChart';
import { motion, AnimatePresence } from 'framer-motion';

// Animation constants
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

const StatisticsPage = () => {
  const { stats } = useStats();
  const [loaded, setLoaded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Safe access with fallbacks
  const totalRevenue = stats?.totalRevenue || 0;
  const avgOrderValue = stats?.avgOrderValue || 0;
  const popularItems = stats?.popularItems || [];
  const topCustomers = stats?.topCustomers || [];
  const weeklyRevenue = stats?.weeklyRevenue || [];
  
  // Calculate total items sold safely
  const totalItemsSold = popularItems.reduce(
    (sum, item) => sum + (item.orders || 0), 
    0
  );
  
  // Find max orders for progress bars
  const maxOrders = popularItems[0]?.orders || 1;

  useEffect(() => {
    // Simulate loading delay for animations
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-8"
    >
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          variants={staggerChildren}
        >
          <motion.h1 
            variants={fadeIn}
            className="text-3xl font-bold text-gray-800 mb-8 relative"
          >
            Statistiques
            <motion.div 
              className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />
          </motion.h1>
          
          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-300"
            >
              <p className="text-gray-500 mb-2">Revenu Total</p>
              <motion.p 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                {totalRevenue.toLocaleString()} FCFA
              </motion.p>
              <motion.div 
                className="mt-3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              />
            </motion.div>
            
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-300"
            >
              <p className="text-gray-500 mb-2">Commande Moyenne</p>
              <motion.p 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent"
              >
                {Math.round(avgOrderValue).toLocaleString()} FCFA
              </motion.p>
              <motion.div 
                className="mt-3 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              />
            </motion.div>
            
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-300"
            >
              <p className="text-gray-500 mb-2">Articles Vendus</p>
              <motion.p 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent"
              >
                {totalItemsSold.toLocaleString()}
              </motion.p>
              <motion.div 
                className="mt-3 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
              />
            </motion.div>
            
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-300"
            >
              <p className="text-gray-500 mb-2">Meilleurs Clients</p>
              <motion.p 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent"
              >
                {topCustomers.length}
              </motion.p>
              <motion.div 
                className="mt-3 h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 overflow-hidden"
            >
              <motion.h2 
                className="text-xl font-semibold mb-4"
                variants={slideIn}
              >
                Revenu Hebdomadaire
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <RevenueChart data={weeklyRevenue} />
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 overflow-hidden"
            >
              <motion.h2 
                className="text-xl font-semibold mb-4"
                variants={slideIn}
              >
                Articles Populaires
              </motion.h2>
              <div className="space-y-4">
                {popularItems.slice(0, 5).map((item, index) => (
                  <motion.div 
                    key={`${item.id || index}-${item.name}`}
                    variants={fadeIn}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 border border-gray-100 shadow-sm transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.name || 'Article sans nom'}</span>
                      <span className="font-semibold">{item.orders} commandes</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-500"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${((item.orders || 0) / maxOrders) * 100}%` 
                        }}
                        transition={{ 
                          delay: 0.3 + (index * 0.1), 
                          duration: 1, 
                          ease: "easeOut" 
                        }}
                        whileHover={{ 
                          background: "linear-gradient(to right, #ff8c00, #ff6b00)"
                        }}
                      />
                    </div>
                    {hoveredItem === index && (
                      <motion.div 
                        className="mt-2 text-xs text-gray-500"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {Math.round(((item.orders || 0) / maxOrders) * 100)}% des ventes totales
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 overflow-hidden"
          >
            <motion.h2 
              className="text-xl font-semibold mb-4"
              variants={slideIn}
            >
              Meilleurs Clients du Mois
            </motion.h2>
            {topCustomers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commandes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topCustomers.map((customer, index) => (
                      <motion.tr 
                        key={`${customer.id || index}-${customer.name}`}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ 
                          backgroundColor: "rgba(249, 250, 251, 0.8)",
                          transform: "translateX(5px)"
                        }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                            {customer.name || 'Client inconnu'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {customer.phone || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {customer.orders || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                          {(customer.amount || 0).toLocaleString()} FCFA
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  Aucun client trouvé pour le moment
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 right-10 w-40 h-40 rounded-full bg-blue-200 opacity-20 blur-3xl -z-10"
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
        className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-purple-200 opacity-20 blur-3xl -z-10"
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

export default StatisticsPage;