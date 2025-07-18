import { useState } from 'react';
import { useCashier } from '../../contexts/CashierContext';

const CashierRegistration = () => {
  const { registerCashier } = useCashier();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone) {
      return;
    }
    
    const newCashier = registerCashier(formData);
    setSuccessMessage(`Caissier enregistré! Code: ${newCashier.code}`);
    setFormData({ fullName: '', email: '', phone: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Enregistrer un nouveau caissier</h2>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default CashierRegistration;