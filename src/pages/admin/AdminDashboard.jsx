// import React from 'react';
// import StatCard from '../../components/StatCard';
// const AdminDashboard = () => {
//   // Données simulées
//   const stats = {
//     establishments: 8,
//     activeManagers: 12,
//     monthlyRevenue: 4850000,
//     newRegistrations: 3
//   };
  
//   const recentActivity = [
//     { time: 'Aujourd\'hui', action: 'Nouvel établissement enregistré', details: 'Le Bon Café' },
//     { time: 'Hier', action: 'QR Code généré', details: 'La Terrasse' },
//     { time: '12 Juil.', action: 'Manager ajouté', details: 'Aya Diomandé' },
//     { time: '10 Juil.', action: 'Menu mis à jour', details: 'Le Jardin Gourmand' },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de Bord Admin</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <StatCard 
//           title="Établissements" 
//           value={stats.establishments} 
//           icon="🏢"
//           color="blue"
//         />
//         <StatCard 
//           title="Managers Actifs" 
//           value={stats.activeManagers} 
//           icon="👤"
//           color="orange"
//         />
//         <StatCard 
//           title="Revenu Mensuel (FCFA)" 
//           value={stats.monthlyRevenue.toLocaleString()} 
//           icon="💰"
//           color="green"
//         />
//         <StatCard 
//           title="Nouvelles Inscriptions" 
//           value={stats.newRegistrations} 
//           icon="📈"
//           color="purple"
//         />
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-4">Activité Récente</h2>
//           <div className="space-y-4">
//             {recentActivity.map((activity, index) => (
//               <div key={index} className="flex pb-4 border-b border-gray-100 last:border-0 last:pb-0">
//                 <div className="mr-4">
//                   <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
//                     <span className="text-orange-600">📝</span>
//                   </div>
//                 </div>
//                 <div className="flex-grow">
//                   <p className="font-medium">{activity.action}</p>
//                   <p className="text-gray-600">{activity.details}</p>
//                 </div>
//                 <div className="text-sm text-gray-500 whitespace-nowrap">
//                   {activity.time}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-4">Statistiques Rapides</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//               <span>Établissements actifs</span>
//               <span className="font-medium">6/8</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//               <span>Commandes aujourd'hui</span>
//               <span className="font-medium">142</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//               <span>Revenu aujourd'hui</span>
//               <span className="font-medium">1,850,000 FCFA</span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//               <span>Nouveaux clients</span>
//               <span className="font-medium">24</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





// import React, { useState, useEffect } from 'react';
// import StatCard from '../../components/StatCard';
// import { useOrders } from '../../contexts/OrderContext';
// import { useStats } from '../../contexts/StatsContext';

// const AdminDashboard = () => {
//   const { orders } = useOrders();
//   const { stats } = useStats();
//   const [recentActivity, setRecentActivity] = useState([]);

//   useEffect(() => {
//     // Générer l'activité récente basée sur les commandes
//     const activity = orders.slice(0, 5).map(order => ({
//       time: new Date(order.createdAt).toLocaleDateString(),
//       action: `Commande #${order.id.substring(0, 8)}`,
//       details: `${order.customerName} - ${order.total.toLocaleString()} FCFA`
//     }));
    
//     setRecentActivity(activity);
//   }, [orders]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de Bord Admin</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <StatCard 
//           title="Établissements" 
//           value="8" 
//           icon="🏢"
//           color="blue"
//         />
//         <StatCard 
//           title="Managers Actifs" 
//           value="12" 
//           icon="👤"
//           color="orange"
//         />
//         <StatCard 
//           title="Revenu Mensuel (FCFA)" 
//           value={stats.totalRevenue.toLocaleString()} 
//           icon="💰"
//           color="green"
//         />
//         <StatCard 
//           title="Nouvelles Inscriptions" 
//           value="3" 
//           icon="📈"
//           color="purple"
//         />
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-4">Activité Récente</h2>
//           <div className="space-y-4">
//             {recentActivity.map((activity, index) => (
//               <div key={index} className="flex pb-4 border-b border-gray-100">
//                 <div className="mr-4">
//                   <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
//                     <span className="text-orange-600">📝</span>
//                   </div>
//                 </div>
//                 <div className="flex-grow">
//                   <p className="font-medium">{activity.action}</p>
//                   <p className="text-gray-600">{activity.details}</p>
//                 </div>
//                 <div className="text-sm text-gray-500 whitespace-nowrap">
//                   {activity.time}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-4">Statistiques Rapides</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//               <span>Commandes aujourd'hui</span>
//               <span className="font-medium">
//                 {orders.filter(o => 
//                   new Date(o.createdAt).toDateString() === new Date().toDateString()
//                 ).length}
//               </span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//               <span>Revenu aujourd'hui</span>
//               <span className="font-medium">
//                 {orders.filter(o => 
//                   new Date(o.createdAt).toDateString() === new Date().toDateString()
//                 ).reduce((sum, order) => sum + order.total, 0).toLocaleString()} FCFA
//               </span>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//               <span>Nouveaux clients</span>
//               <span className="font-medium">
//                 {[...new Set(orders.map(o => o.customerPhone))].length}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import { useStats } from '../../contexts/StatsContext';

const AdminDashboard = () => {
  const { stats } = useStats();

  const recentActivity = [
    { time: 'Aujourd\'hui', action: 'Nouvel établissement enregistré', details: 'Le Bon Café' },
    { time: 'Hier', action: 'QR Code généré', details: 'La Terrasse' },
    { time: '12 Juil.', action: 'Manager ajouté', details: 'Aya Diomandé' },
    { time: '10 Juil.', action: 'Menu mis à jour', details: 'Le Jardin Gourmand' },
  ];

  // Variants d'animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        Tableau de Bord Admin
      </motion.h1>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
      >
        <motion.div variants={item}>
          <StatCard 
            title="Établissements" 
            value={stats.establishments} 
            icon="🏢"
            color="blue"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard 
            title="Managers Actifs" 
            value={stats.activeManagers} 
            icon="👤"
            color="orange"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard 
            title="Revenu Mensuel (FCFA)" 
            value={stats.monthlyRevenue.toLocaleString()} 
            icon="💰"
            color="green"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard 
            title="Nouvelles Inscriptions" 
            value={stats.newRegistrations} 
            icon="📈"
            color="purple"
          />
        </motion.div>
        <motion.div variants={item}>
          <Link to="/admin/settings">
            <StatCard 
              title="Paramètres" 
              value={stats.settings} 
              icon="⚙️"
              color="indigo"
              clickable={true}
            />
          </Link>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-xl p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Activité Récente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex pb-4 border-b border-gray-100 last:border-0 last:pb-0 group"
              >
                <div className="mr-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <span className="text-orange-600 group-hover:scale-110 transition-transform">📝</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-gray-600">{activity.details}</p>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap flex items-center">
                  <span className="mr-1">⏱</span>
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-xl p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Statistiques rapides</h2>
          <div className="space-y-4">
            {[
              { label: 'Établissements actifs', value: '6/8', icon: '🏢' },
              { label: 'Commandes aujourd\'hui', value: '142', icon: '🛒' },
              { label: 'Revenu aujourd\'hui', value: '1,850,000 FCFA', icon: '💳' },
              { label: 'Nouveaux clients', value: '24', icon: '👥' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex justify-between items-center p-4 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">{stat.icon}</span>
                  <span>{stat.label}</span>
                </div>
                <span className="font-medium text-indigo-700">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;