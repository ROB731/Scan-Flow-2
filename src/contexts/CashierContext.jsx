import { createContext, useContext, useState } from 'react';

const CashierContext = createContext();

export function CashierProvider({ children }) {
  const [cashiers, setCashiers] = useState([]);
  const [activeCashier, setActiveCashier] = useState(null);
  const [dailySummary, setDailySummary] = useState({
    orders: 0,
    revenue: 0,
    startTime: new Date()
  });

  const registerCashier = (cashierData) => {
    const newCashier = {
      ...cashierData,
      id: `cashier-${Date.now()}`,
      code: Math.random().toString(36).substr(2, 6).toUpperCase()
    };
    setCashiers([...cashiers, newCashier]);
    return newCashier;
  };

  const startShift = (cashierId) => {
    setActiveCashier(cashiers.find(c => c.id === cashierId));
    setDailySummary({
      orders: 0,
      revenue: 0,
      startTime: new Date()
    });
  };

  const endShift = () => {
    setActiveCashier(null);
  };

  const addOrderToSummary = (orderTotal) => {
    setDailySummary(prev => ({
      ...prev,
      orders: prev.orders + 1,
      revenue: prev.revenue + orderTotal
    }));
  };

  return (
    <CashierContext.Provider value={{
      cashiers,
      registerCashier,
      activeCashier,
      startShift,
      endShift,
      dailySummary,
      addOrderToSummary
    }}>
      {children}
    </CashierContext.Provider>
  );
}

export function useCashier() {
  return useContext(CashierContext);
}