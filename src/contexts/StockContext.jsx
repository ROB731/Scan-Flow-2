import { createContext, useContext, useState, useEffect } from 'react';
import { useMenu } from './MenuContext';
const StockContext = createContext();
export function StockProvider({ children }) {
  const { categories } = useMenu();
  const [stockAlerts, setStockAlerts] = useState([]);
  const [stockThreshold] = useState(5);
  useEffect(() => {
    checkStockLevels();
  }, [categories]);
  const checkStockLevels = () => {
    const alerts = [];
    categories.forEach(category => {
      category.products.forEach(product => {
        if (product.stock !== undefined && product.stock <= stockThreshold) {
          alerts.push({
            productId: product.id,
            productName: product.name,
            currentStock: product.stock,
            category: category.name
          });
        }
      });
    });
    
    setStockAlerts(alerts);
  };

  const updateStock = (productId, newStock) => {
    console.log(`Mise à jour stock: ${productId} -> ${newStock}`);
  };

  return (
    <StockContext.Provider value={{ stockAlerts, updateStock, stockThreshold }}>
      {children}
    </StockContext.Provider>
  );
}
export function useStock() {
  return useContext(StockContext);
}