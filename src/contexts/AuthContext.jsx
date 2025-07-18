// import { createContext, useContext, useState } from 'react';
// const AuthContext = createContext();
// export function AuthProvider({ children }) {
//   const [user] = useState({
//     id: 'admin-001',
//     name: 'Admin Test',
//     role: 'admin'
//   });
//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// export function useAuth() {
//   return useContext(AuthContext);
// }







import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const registerAdmin = (adminData) => {
    const newAdmin = {
      ...adminData,
      id: `admin-${Date.now()}`,
      role: 'admin'
    };
    setUser(newAdmin);
    localStorage.setItem('user', JSON.stringify(newAdmin));
    return newAdmin;
  };
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      registerAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}