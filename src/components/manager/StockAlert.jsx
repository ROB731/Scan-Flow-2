import { useStock } from '../../contexts/StockContext';

const StockAlert = () => {
  const { stockAlerts, stockThreshold } = useStock();

  if (stockAlerts.length === 0) return null;

  return (
    <div className="bg-red-50 rounded-lg overflow-hidden mb-6">
      <div className="bg-red-100 text-red-800 px-4 py-2 font-medium">
        Alertes de stock ({stockAlerts.length})
      </div>
      
      <div className="p-4">
        <p className="text-sm mb-3">
          Produits avec stock ≤ {stockThreshold}:
        </p>
        
        <ul className="space-y-2">
          {stockAlerts.map((alert, index) => (
            <li key={index} className="flex justify-between items-center border-b border-red-100 pb-2">
              <div>
                <span className="font-medium">{alert.productName}</span>
                <span className="text-sm text-gray-600 ml-2">({alert.category})</span>
              </div>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                Stock: {alert.currentStock}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockAlert;