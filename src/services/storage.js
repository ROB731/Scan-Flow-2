// Local storage helpers
export const saveToLocalStorage = (key, data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  export const loadFromLocalStorage = (key) => {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  };
  
  export const clearLocalStorage = (key) => {
    localStorage.removeItem(key);
  };