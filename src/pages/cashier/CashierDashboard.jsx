import React from 'react';
import { useCashier } from '../../contexts/CashierContext';
import DailySummary from '../../components/cashier/DailySummary';
import StatCard from '../../components/StatCard';

const CashierDashboard = () => {
  const { activeCashier, dailySummary } = useCashier();

  if (!activeCashier) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-4">Aucun caissier actif</h2>
        <p>Veuillez commencer votre service</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord Caissier</h1>
          <p className="text-gray-600">Bonjour {activeCashier.fullName}</p>
        </div>
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
          Code: {activeCashier.code}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Commandes Traitées" 
          value={dailySummary.orders} 
          icon="📊"
          color="blue"
        />
        <StatCard 
          title="Revenu Journalier" 
          value={`${dailySummary.revenue.toLocaleString()} FCFA`} 
          icon="💰"
          color="green"
        />
        <StatCard 
          title="Heure Début" 
          value={new Date(dailySummary.startTime).toLocaleTimeString()} 
          icon="⏱️"
          color="purple"
        />
      </div>
      
      <DailySummary />
    </div>
  );
};

export default CashierDashboard;