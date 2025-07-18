import React, { useState } from 'react';
import { useOrders } from '../../contexts/OrderContext';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { useCashier } from '../../contexts/CashierContext';

const OrderProcessing = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { addOrderToSummary } = useCashier();
  const [activeTab, setActiveTab] = useState('pending');
  
  const filteredOrders = orders.filter(order => order.status === activeTab);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    
    if (newStatus === 'completed') {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        addOrderToSummary(order.total);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Commandes</h1>
      
      <div className="flex overflow-x-auto mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('pending')}
        >
          En attente
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'preparation' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('preparation')}
        >
          En préparation
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'ready' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('ready')}
        >
          Prêtes
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune commande {getStatusLabel(activeTab)}</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <div key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">Commande #{order.id.substring(0, 8)}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.customerPhone}</p>
                </div>
                
                <div className="mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="text-sm">
                      {item.quantity}x {item.name}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="font-bold">{order.total.toLocaleString()} FCFA</div>
                  <div className="space-x-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'preparation')}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Commencer préparation
                      </button>
                    )}
                    {order.status === 'preparation' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'ready')}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Marquer comme prête
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'completed')}
                        className="bg-orange-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Commande livrée
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
function getStatusLabel(status) {
  switch(status) {
    case 'pending': return 'en attente';
    case 'preparation': return 'en préparation';
    case 'ready': return 'prêtes';
    default: return '';
  }
}

export default OrderProcessing;