import React, { createContext, useContext, useState } from 'react';

// Create a Context
const PnrContext = createContext();

// Create a Provider component
export const PnrProvider = ({ children }) => {
  const [pnrNumber, setPnrNumber] = useState("");

  return (
    <PnrContext.Provider value={{ pnrNumber, setPnrNumber }}>
      {children}
    </PnrContext.Provider>
  );
};


export const usePnr = () => {
  return useContext(PnrContext);
};
