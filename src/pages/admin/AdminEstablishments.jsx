// import React, { useState } from 'react';
// import QRCodeGenerator from '../../components/common/QRCodeGenerator';
// import { motion } from 'framer-motion';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AdminEstablishments = () => {
//   const [establishments, setEstablishments] = useState([
//     {
//       id: '1',
//       name: 'Le Bon Pain',
//       type: 'pâtisserie',
//       address: 'Plateau, Abidjan',
//       phone: '27 20 21 22',
//       manager: 'Koffi Amani',
//       qrCode: null,
//       amount: 500000
//     }
//   ]);
  
//   const [newEstablishment, setNewEstablishment] = useState({
//     name: '',
//     type: 'restaurant',
//     address: '',
//     phone: '',
//     manager: '',
//     amount: 0
//   });
  
//   const [showQRGenerator, setShowQRGenerator] = useState(false);
//   const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  
//   const handleAddEstablishment = () => {
//     if (newEstablishment.name && newEstablishment.address) {
//       const newEst = {
//         id: Date.now().toString(),
//         ...newEstablishment,
//         qrCode: null
//       };
      
//       setEstablishments([newEst, ...establishments]);
//       setNewEstablishment({
//         name: '',
//         type: 'restaurant',
//         address: '',
//         phone: '',
//         manager: '',
//         amount: 0
//       });
      
//       toast.success('Établissement ajouté avec succès!');
//     } else {
//       toast.error('Veuillez remplir tous les champs obligatoires');
//     }
//   };
  
//   const handleGenerateQR = (establishment) => {
//     setSelectedEstablishment(establishment);
//     setShowQRGenerator(true);
//   };
  
//   const handleSaveQRCode = (qrDataUrl) => {
//     setEstablishments(establishments.map(est => 
//       est.id === selectedEstablishment.id 
//         ? { ...est, qrCode: qrDataUrl } 
//         : est
//     ));
//     setShowQRGenerator(false);
//     toast.success('QR Code enregistré avec succès!');
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto px-4 py-8"
//     >
//       <ToastContainer 
//         position="top-right" 
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
      
//       <motion.h1 
//         initial={{ y: -20 }}
//         animate={{ y: 0 }}
//         className="text-3xl font-bold text-gray-800 mb-8"
//       >
//         Gestion des Établissements
//       </motion.h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <motion.div 
//           whileHover={{ scale: 1.01 }}
//           className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
//         >
//           <h2 className="text-xl font-semibold mb-4">Ajouter un établissement</h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'établissement</label>
//               <input
//                 type="text"
//                 value={newEstablishment.name}
//                 onChange={(e) => setNewEstablishment({...newEstablishment, name: e.target.value})}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
//                 placeholder="Ex: Le Bon Pain"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//               <select
//                 value={newEstablishment.type}
//                 onChange={(e) => setNewEstablishment({...newEstablishment, type: e.target.value})}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
//               >
//                 <option value="restaurant">Restaurant</option>
//                 <option value="bar">Bar</option>
//                 <option value="pâtisserie">Pâtisserie</option>
//                 <option value="café">Café</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
//               <input
//                 type="text"
//                 value={newEstablishment.address}
//                 onChange={(e) => setNewEstablishment({...newEstablishment, address: e.target.value})}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
//                 placeholder="Ex: Plateau, Abidjan"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
//               <input
//                 type="text"
//                 value={newEstablishment.phone}
//                 onChange={(e) => setNewEstablishment({...newEstablishment, phone: e.target.value})}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
//                 placeholder="Ex: 27 20 21 22"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Manager assigné</label>
//               <input
//                 type="text"
//                 value={newEstablishment.manager}
//                 onChange={(e) => setNewEstablishment({...newEstablishment, manager: e.target.value})}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
//                 placeholder="Ex: Koffi Amani"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Montant (FCFA)</label>
//               <input
//                 type="number"
//                 value={newEstablishment.amount}
//                 onChange={(e) => setNewEstablishment({...newEstablishment, amount: parseFloat(e.target.value) || 0})}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
//                 placeholder="Ex: 500000"
//               />
//             </div>
            
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleAddEstablishment}
//               className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
//             >
//               Ajouter l'établissement
//             </motion.button>
//           </div>
//         </motion.div>
        
//         <motion.div 
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300"
//         >
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Établissements enregistrés</h2>
          
//           <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
//             {establishments.map((establishment, index) => (
//               <motion.div 
//                 key={establishment.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-bold text-lg">{establishment.name}</h3>
//                     <div className="flex items-center text-sm text-gray-600 mt-1">
//                       <span className="capitalize">{establishment.type}</span>
//                       <span className="mx-2">•</span>
//                       <span>{establishment.address}</span>
//                     </div>
//                     <div className="mt-2">
//                       <span className="text-gray-700">Manager:</span> {establishment.manager}
//                     </div>
//                     <div>
//                       <span className="text-gray-700">Téléphone:</span> {establishment.phone}
//                     </div>
//                     <div className="mt-1">
//                       <span className="text-gray-700">Montant:</span> 
//                       <span className="font-bold text-green-600 ml-1">
//                         {establishment.amount.toLocaleString()} FCFA
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col items-end">
//                     {establishment.qrCode ? (
//                       <div className="flex flex-col items-center">
//                         <img 
//                           src={establishment.qrCode} 
//                           alt="QR Code" 
//                           className="w-16 h-16 mb-1 shadow-md rounded"
//                         />
//                         <motion.button 
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => handleGenerateQR(establishment)}
//                           className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
//                         >
//                           Regénérer
//                         </motion.button>
//                       </div>
//                     ) : (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handleGenerateQR(establishment)}
//                         className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm py-1 px-3 rounded shadow-md"
//                       >
//                         Générer QR
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
      
//       {showQRGenerator && selectedEstablishment && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//         >
//           <motion.div 
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
//           >
//             <h3 className="text-xl font-bold mb-4">
//               QR Code pour {selectedEstablishment.name}
//             </h3>
            
//             <div className="flex justify-center">
//               <QRCodeGenerator 
//                 value={`https://restoqr.app/menu/${selectedEstablishment.id}`} 
//                 size={256}
//               />
//             </div>
            
//             <div className="flex space-x-3 mt-6">
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setShowQRGenerator(false)}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md shadow transition-all"
//               >
//                 Annuler
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleSaveQRCode('qr-placeholder')}
//                 className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-2 rounded-md shadow transition-all"
//               >
//                 Enregistrer QR Code
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default AdminEstablishments;






import React, { useState } from 'react';
import QRGenerator from '../../components/common/QRCodeGenerator';

const AdminEstablishments = () => {
  const [establishments, setEstablishments] = useState([
    {
      id: '1',
      name: 'Le Bon Pain',
      type: 'pâtisserie',
      address: 'Plateau, Abidjan',
      phone: '27 20 21 22',
      manager: 'Koffi Amani',
      qrCode: null,
      revenue: 1500000,
      transactions: [
        { date: '2023-10-01', amount: 250000 },
        { date: '2023-10-15', amount: 300000 },
        { date: '2023-11-01', amount: 350000 },
        { date: '2023-11-15', amount: 350000 },
        { date: '2023-12-01', amount: 250000 },
      ]
    },
    {
      id: '2',
      name: 'La Terrasse',
      type: 'restaurant',
      address: 'Cocody, Abidjan',
      phone: '27 30 31 32',
      manager: 'Aya Diomandé',
      qrCode: null,
      revenue: 2750000,
      transactions: [
        { date: '2023-10-01', amount: 400000 },
        { date: '2023-10-15', amount: 450000 },
        { date: '2023-11-01', amount: 500000 },
        { date: '2023-11-15', amount: 500000 },
        { date: '2023-12-01', amount: 500000 },
      ]
    }
  ]);
  
  const [newEstablishment, setNewEstablishment] = useState({
    name: '',
    type: 'restaurant',
    address: '',
    phone: '',
    manager: '',
    revenue: 0
  });
  
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [showRevenueStats, setShowRevenueStats] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'month', 'quarter', 'year'
  
  const handleAddEstablishment = () => {
    if (newEstablishment.name && newEstablishment.address) {
      const newEst = {
        id: Date.now().toString(),
        ...newEstablishment,
        qrCode: null,
        revenue: 0,
        transactions: []
      };
      
      setEstablishments([...establishments, newEst]);
      setNewEstablishment({
        name: '',
        type: 'restaurant',
        address: '',
        phone: '',
        manager: '',
        revenue: 0
      });
    }
  };
  
  const handleGenerateQR = (establishment) => {
    setSelectedEstablishment(establishment);
    setShowQRGenerator(true);
  };
  
  const handleShowRevenueStats = (establishment) => {
    setSelectedEstablishment(establishment);
    setShowRevenueStats(true);
  };
  
  const handleSaveQRCode = (qrDataUrl) => {
    setEstablishments(establishments.map(est => 
      est.id === selectedEstablishment.id 
        ? { ...est, qrCode: qrDataUrl } 
        : est
    ));
    setShowQRGenerator(false);
  };

  // Calculer les revenus filtrés
  const calculateFilteredRevenue = () => {
    if (!selectedEstablishment) return 0;
    
    const now = new Date();
    let filteredTransactions = [...selectedEstablishment.transactions];
    
    if (timeFilter === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filteredTransactions = filteredTransactions.filter(t => new Date(t.date) > oneMonthAgo);
    } 
    else if (timeFilter === 'quarter') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filteredTransactions = filteredTransactions.filter(t => new Date(t.date) > threeMonthsAgo);
    }
    else if (timeFilter === 'year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      filteredTransactions = filteredTransactions.filter(t => new Date(t.date) > oneYearAgo);
    }
    
    return filteredTransactions.reduce((total, t) => total + t.amount, 0);
  };

  // Formater les nombres avec séparateurs de milliers
  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 animate-fadeIn">
        Gestion des Établissements
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Ajouter un établissement</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'établissement</label>
              <input
                type="text"
                value={newEstablishment.name}
                onChange={(e) => setNewEstablishment({...newEstablishment, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="Ex: Le Bon Pain"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newEstablishment.type}
                onChange={(e) => setNewEstablishment({...newEstablishment, type: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              >
                <option value="restaurant">Restaurant</option>
                <option value="bar">Bar</option>
                <option value="pâtisserie">Pâtisserie</option>
                <option value="café">Café</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                value={newEstablishment.address}
                onChange={(e) => setNewEstablishment({...newEstablishment, address: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="Ex: Plateau, Abidjan"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="text"
                value={newEstablishment.phone}
                onChange={(e) => setNewEstablishment({...newEstablishment, phone: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="Ex: 27 20 21 22"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manager assigné</label>
              <input
                type="text"
                value={newEstablishment.manager}
                onChange={(e) => setNewEstablishment({...newEstablishment, manager: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="Ex: Koffi Amani"
              />
            </div>
            
            <button
              onClick={handleAddEstablishment}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition-all transform hover:scale-[1.02] font-medium shadow-md"
            >
              Ajouter l'établissement
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Établissements enregistrés
          </h2>
          
          <div className="space-y-6">
            {establishments.map(establishment => (
              <div 
                key={establishment.id} 
                className="border border-gray-200 rounded-2xl p-5 bg-gradient-to-r from-orange-50 to-amber-50 shadow-md transition-all duration-500 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl text-orange-800 mb-2">
                      {establishment.name}
                    </h3>
                    <div className="flex flex-wrap items-center text-gray-600 mb-3 gap-2">
                      <span className="capitalize bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {establishment.type}
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {establishment.address}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span>{establishment.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span>{establishment.manager}</span>
                      </div>
                      <div className="flex items-center text-sm font-bold text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatNumber(establishment.revenue)} FCFA</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div>
                      {establishment.qrCode ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={establishment.qrCode} 
                            alt="QR Code" 
                            className="w-24 h-24 mb-2 rounded-lg shadow-md transition-transform duration-500 hover:scale-110"
                          />
                          <button 
                            onClick={() => handleGenerateQR(establishment)}
                            className="text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Regénérer
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleGenerateQR(establishment)}
                          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl flex items-center transition-all transform hover:scale-105 shadow-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                          </svg>
                          Générer QR
                        </button>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleShowRevenueStats(establishment)}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl flex items-center transition-all transform hover:scale-105 shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Statistiques
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {showQRGenerator && selectedEstablishment && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              QR Code pour {selectedEstablishment.name}
            </h3>
            
            <QRGenerator 
              data={`https://restoqr.app/menu/${selectedEstablishment.id}`} 
              establishmentName={selectedEstablishment.name}
              onSave={handleSaveQRCode}
              onCancel={() => setShowQRGenerator(false)}
            />
          </div>
        </div>
      )}
      
      {showRevenueStats && selectedEstablishment && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Statistiques de revenus - {selectedEstablishment.name}
            </h3>
            
            <div className="mb-6 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-4 py-2 rounded-xl ${
                  timeFilter === 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setTimeFilter('month')}
                className={`px-4 py-2 rounded-xl ${
                  timeFilter === 'month' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                30 jours
              </button>
              <button
                onClick={() => setTimeFilter('quarter')}
                className={`px-4 py-2 rounded-xl ${
                  timeFilter === 'quarter' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                3 mois
              </button>
              <button
                onClick={() => setTimeFilter('year')}
                className={`px-4 py-2 rounded-xl ${
                  timeFilter === 'year' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                1 an
              </button>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {formatNumber(calculateFilteredRevenue())} FCFA
              </div>
              <div className="text-gray-600">
                Revenu {timeFilter === 'all' ? 'total' : 
                timeFilter === 'month' ? 'des 30 derniers jours' : 
                timeFilter === 'quarter' ? 'des 3 derniers mois' : 
                'des 12 derniers mois'}
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-2xl p-4 mb-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-700">Détails des transactions</h4>
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Date</th>
                      <th className="text-right py-2 px-3">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEstablishment.transactions.map((transaction, index) => (
                      <tr key={index} className="border-b hover:bg-orange-50">
                        <td className="py-2 px-3">{transaction.date}</td>
                        <td className="py-2 px-3 text-right font-medium text-green-600">
                          {formatNumber(transaction.amount)} FCFA
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowRevenueStats(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-xl"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEstablishments;