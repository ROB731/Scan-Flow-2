import React from 'react';
import CashierRegistration from '../../components/manager/CashierRegistration';
import { useCashier } from '../../contexts/CashierContext';

const CashierManagement = () => {
  const { cashiers } = useCashier();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestion des Caissiers</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CashierRegistration />
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Caissiers enregistrés</h2>
          
          <div className="space-y-4">
            {cashiers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun caissier enregistré
              </div>
            ) : (
              cashiers.map(cashier => (
                <div key={cashier.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{cashier.fullName}</h3>
                      <div className="text-sm text-gray-600">{cashier.phone}</div>
                      <div className="text-sm text-gray-600">{cashier.email}</div>
                    </div>
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      Code: {cashier.code}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierManagement;