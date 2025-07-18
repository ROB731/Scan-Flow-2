
// import React from 'react';
// const StatCard = ({ title, value, icon, color = 'blue' }) => {
//   const colorClasses = {
//     blue: 'bg-blue-100 text-blue-800',
//     orange: 'bg-orange-100 text-orange-800',
//     green: 'bg-green-100 text-green-800',
//     purple: 'bg-purple-100 text-purple-800'
//   };
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-5">
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-gray-500 text-sm">{title}</p>
//           <p className="text-2xl font-bold mt-1">{value}</p>
//         </div>
//         <div className={`${colorClasses[color]} w-12 h-12 rounded-full flex items-center justify-center`}>
//           <span className="text-xl">{icon}</span>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default StatCard;





// import React from 'react';
// import { motion } from 'framer-motion';
// const StatCard = ({ title, value, icon, color = 'blue' }) => {
//   const colorClasses = {
//     blue: 'bg-blue-100 text-blue-800',
//     orange: 'bg-orange-100 text-orange-800',
//     green: 'bg-green-100 text-green-800',
//     purple: 'bg-purple-100 text-purple-800'
//   };
//   return (
//     <motion.div 
//       whileHover={{ y: -5, scale: 1.02 }}
//       className="bg-white rounded-xl shadow-sm p-5 h-full"
//     >
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-gray-500 text-sm">{title}</p>
//           <motion.p 
//             key={value}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-2xl font-bold mt-1"
//           >
//             {value}
//           </motion.p>
//         </div>
//         <motion.div 
//           whileHover={{ rotate: 10 }}
//           className={`${colorClasses[color]} w-12 h-12 rounded-full flex items-center justify-center`}
//         >
//           <span className="text-xl">{icon}</span>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default StatCard;

import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, clickable = false }) => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-amber-500',
    green: 'from-emerald-500 to-teal-500',
    purple: 'from-purple-500 to-indigo-500',
    indigo: 'from-indigo-500 to-blue-500' // Nouvelle couleur pour les paramètres
  };

  return (
    <motion.div 
      whileHover={{ 
        y: clickable ? -10 : 0,
        scale: clickable ? 1.03 : 1,
        boxShadow: clickable 
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
          : "none"
      }}
      className={`bg-gradient-to-r ${colorMap[color]} rounded-2xl p-5 text-white shadow-lg overflow-hidden relative ${
        clickable ? 'cursor-pointer' : ''
      }`}
    >
      <div className="absolute top-4 right-4 text-4xl opacity-20">{icon}</div>
      <div className="relative z-10">
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-50"
      />
    </motion.div>
  );
};

export default StatCard;