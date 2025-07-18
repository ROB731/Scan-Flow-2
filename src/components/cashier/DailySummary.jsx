import React from 'react';
import { useCashier } from '../../contexts/CashierContext';

const DailySummary = () => {
  const { dailySummary, endShift } = useCashier();

  const handleEndShift = () => {
    if (window.confirm("Voulez-vous vraiment clôturer la caisse ?")) {
      endShift();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Point de la journée</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Heure début</div>
          <div className="text-lg font-medium">
            {new Date(dailySummary.startTime).toLocaleTimeString()}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Heure actuelle</div>
          <div className="text-lg font-medium">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Nombre de commandes:</span>
          <span className="font-medium">{dailySummary.orders}</span>
        </div>
        
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Revenu total:</span>
          <span className="font-bold text-lg text-orange-600">
            {dailySummary.revenue.toLocaleString()} FCFA
          </span>
        </div>
        
        <button
          onClick={handleEndShift}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        >
          Clôturer la caisse
        </button>
      </div>
    </div>
  );
};

export default DailySummary;