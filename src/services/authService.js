// src/services/authService.js

// Simulated authentication service
export const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'manager@restoqr.ci' && password === 'password123') {
          resolve({
            id: 'mgr-001',
            name: 'Koffi Amani',
            email: 'manager@restoqr.ci',
            role: 'manager',
            establishmentId: 'resto-001'
          });
        } else if (email === 'admin@restoqr.ci' && password === 'admin123') {
          resolve({
            id: 'admin-001',
            name: 'Admin RestoQR',
            email: 'admin@restoqr.ci',
            role: 'admin'
          });
        } else {
          reject(new Error('Email ou mot de passe incorrect'));
        }
      }, 1000);
    });
  };
  
  export const logout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };





//  Email : manager@restoqr.ci
// Mot de passe : password123
// Pour l'admin :
// Email : admin@restoqr.ci
// Mot de passe : admin123