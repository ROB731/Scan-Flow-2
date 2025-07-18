// Format currency for Ivory Coast (FCFA)
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-CI', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Generate a unique ID
  export const generateId = (prefix = '') => {
    return prefix + '-' + Math.random().toString(36).substr(2, 9);
  };
  // Truncate text with ellipsis
  export const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };