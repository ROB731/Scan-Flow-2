import React, { createContext, useContext } from 'react';

export const EstablishmentContext = createContext('default-establishment-id');

export const EstablishmentProvider = ({ children, value }) => {
  return (
    <EstablishmentContext.Provider value={value}>
      {children}
    </EstablishmentContext.Provider>
  );
};

export const useEstablishment = () => useContext(EstablishmentContext);