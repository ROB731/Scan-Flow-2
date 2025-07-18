import React, { useState, useEffect, useCallback } from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiPackage, FiClock, FiDollarSign, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';

// Animations
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

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: "bg-orange-100 text-orange-800", icon: "⏱️" },
    preparation: { color: "bg-blue-100 text-blue-800", icon: "👨‍🍳" },
    ready: { color: "bg-green-100 text-green-800", icon: "✅" },
    completed: { color: "bg-purple-100 text-purple-800", icon: "🎉" }
  };

  const { color, icon } = statusConfig[status] || { color: "bg-gray-100 text-gray-800", icon: "❓" };

  return (
    <motion.span 
      className={`px-3 py-1 rounded-full text-sm font-medium ${color} flex items-center space-x-1`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <span>{icon}</span>
      <span>{getStatusLabel(status)}</span>
    </motion.span>
  );
};

const StatCard = ({ title, value, icon, color, loading }) => {
  const colorClasses = {
    blue: { bg: "from-blue-50 to-blue-100", border: "border-blue-200", text: "text-blue-600" },
    orange: { bg: "from-orange-50 to-orange-100", border: "border-orange-200", text: "text-orange-600" },
    green: { bg: "from-green-50 to-green-100", border: "border-green-200", text: "text-green-600" },
    purple: { bg: "from-purple-50 to-purple-100", border: "border-purple-200", text: "text-purple-600" }
  };
  
  const { bg, border, text } = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      variants={scaleUp}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(249, 115, 22, 0.5)"
      }}
      className={`bg-gradient-to-br ${bg} border ${border} p-5 rounded-xl shadow-sm transition-all duration-300`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          {loading ? (
            <div className="h-8 w-32 bg-gray-200 rounded mt-2 animate-pulse"></div>
          ) : (
            <motion.p 
              className="text-2xl font-bold mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${text} bg-white shadow-sm`}>
          {icon}
        </div>
      </div>
      <motion.div 
        className="mt-3 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

const OrdersManagement = () => {
  const ordersContext = useOrders();
  const [activeTab, setActiveTab] = useState('all');
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Vérifie si le contexte est disponible
  if (!ordersContext) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-red-600">Erreur</h1>
        <p className="text-lg text-gray-700 mt-4">
          Le contexte des commandes n'est pas disponible. Veuillez vérifier que le composant est bien enveloppé dans OrdersProvider.
        </p>
      </motion.div>
    );
  }

  const { orders, updateOrderStatus } = ordersContext;
  
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });
  
  // Filtrer par terme de recherche
  const searchedOrders = filteredOrders.filter(order => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerPhone.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchLower)
    );
  });
  
  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(o => o.status === 'pending').length;
      const revenue = orders.reduce((sum, order) => {
        if (order.status === 'completed') return sum + order.total;
        return sum;
      }, 0);
      
      setStats({ totalOrders, pendingOrders, revenue });
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [orders]);
  
  const handleStatusChange = useCallback((orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  }, [updateOrderStatus]);
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('fr-CI', options);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <motion.div className="flex justify-between items-center mb-8">
          <motion.h1 
            variants={fadeIn}
            className="text-3xl font-bold text-gray-800 relative"
          >
            Gestion des Commandes
            <motion.div 
              className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />
          </motion.h1>
          
          <motion.button
            variants={fadeIn}
            whileHover={{ rotate: 45, scale: 1.1 }}
            whileTap={{ rotate: 90, scale: 0.9 }}
            className="p-3 bg-white rounded-full shadow-md border border-gray-200"
          >
            <FiRefreshCw className="text-gray-600" />
          </motion.button>
        </motion.div>
        
        <motion.div 
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatCard 
            title="Commandes Total" 
            value={stats.totalOrders} 
            icon={<FiPackage className="text-2xl" />}
            color="blue"
            loading={loading}
          />
          <StatCard 
            title="En Attente" 
            value={stats.pendingOrders} 
            icon={<FiClock className="text-2xl" />}
            color="orange"
            loading={loading}
          />
          <StatCard 
            title="Revenu (FCFA)" 
            value={stats.revenue.toLocaleString()} 
            icon={<FiDollarSign className="text-2xl" />}
            color="green"
            loading={loading}
          />
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex overflow-x-auto scrollbar-hide mb-4 md:mb-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 font-medium rounded-l-lg ${activeTab === 'all' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('all')}
              >
                Toutes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('pending')}
              >
                En attente
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 font-medium ${activeTab === 'preparation' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('preparation')}
              >
                En préparation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 font-medium ${activeTab === 'ready' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('ready')}
              >
                Prêtes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 font-medium rounded-r-lg ${activeTab === 'completed' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('completed')}
              >
                Terminées
              </motion.button>
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <FiFilter className="mr-2" />
                  Filtres
                  {isFilterOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                </motion.button>
                
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-10 overflow-hidden"
                    >
                      <div className="p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Client, téléphone..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {searchedOrders.length > 0 ? (
                    searchedOrders.map(order => (
                      <motion.tr 
                        key={order.id}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50"
                        whileHover={{ 
                          backgroundColor: "rgba(249, 250, 251, 0.8)",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{order.id.substring(0, 8)}</div>
                          <div className="text-sm text-gray-500">{order.items.length} articles</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerPhone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.total.toLocaleString()} FCFA
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex flex-wrap gap-2">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleStatusChange(order.id, 'pending')}
                              className={`px-3 py-1 rounded-full text-xs ${order.status === 'pending' ? 'bg-orange-100 text-orange-800 border border-orange-200' : 'text-gray-600 hover:bg-gray-100'}`}
                              disabled={order.status === 'pending'}
                            >
                              Attente
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleStatusChange(order.id, 'preparation')}
                              className={`px-3 py-1 rounded-full text-xs ${order.status === 'preparation' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'text-gray-600 hover:bg-gray-100'}`}
                              disabled={order.status === 'preparation'}
                            >
                              Préparation
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleStatusChange(order.id, 'ready')}
                              className={`px-3 py-1 rounded-full text-xs ${order.status === 'ready' ? 'bg-green-100 text-green-800 border border-green-200' : 'text-gray-600 hover:bg-gray-100'}`}
                              disabled={order.status === 'ready'}
                            >
                              Prêt
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <td colSpan="6" className="py-16">
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiPackage className="text-4xl text-gray-400" />
                          </div>
                          <h3 className="text-xl font-medium text-gray-700 mb-2">Aucune commande trouvée</h3>
                          <p className="text-gray-500">
                            {activeTab === 'all' 
                              ? "Vous n'avez aucune commande pour le moment" 
                              : `Aucune commande avec le statut "${getStatusLabel(activeTab)}"`}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
                            onClick={() => {
                              setActiveTab('all');
                              setSearchTerm('');
                            }}
                          >
                            Voir toutes les commandes
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-orange-200 opacity-20 blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-blue-200 opacity-20 blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
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

function getStatusLabel(status) {
  switch(status) {
    case 'pending': return 'En attente';
    case 'preparation': return 'En préparation';
    case 'ready': return 'Prête';
    case 'completed': return 'Terminée';
    default: return status;
  }
}

export default OrdersManagement;