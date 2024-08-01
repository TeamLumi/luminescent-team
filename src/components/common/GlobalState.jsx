import React, { useState, createContext, useContext, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalState = ({ children }) => {
  const [globalState, setGlobalState] = useState(() => {
    // Check if window is defined (client-side)
    const storedMode = typeof window !== 'undefined' ? window.sessionStorage.getItem('mode') : null;
    return { mode: storedMode || '2.0' };
  });

  useEffect(() => {
    // Update sessionStorage when the mode changes
    sessionStorage.setItem('mode', globalState.mode);
  }, [globalState.mode]);

  const updateMode = (newMode) => {
    if (newMode === '2.0' || newMode === '3.0') {
      setGlobalState((oldState) => ({
        ...oldState,
        mode: newMode,
      }));
    }
  };

  return (
    <GlobalContext.Provider value={[globalState, updateMode]}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
