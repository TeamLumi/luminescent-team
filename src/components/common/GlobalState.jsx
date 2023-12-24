import React, { useState, createContext, useContext, useEffect } from "react";

const GlobalContext = createContext(null);

export const GlobalState = (props) => {
  const [globalState, setGlobalState] = useState(() => {
    const storedMode = sessionStorage.getItem("mode");
    return { mode: storedMode || "3.0" };
  });

  useEffect(() => {
    // Update sessionStorage when the mode changes
    sessionStorage.setItem("mode", globalState.mode);
  }, [globalState.mode]);

  const updateMode = (newMode) => {
    if (newMode === "2.0" || newMode === "3.0") {
      setGlobalState((oldState) => ({
        ...oldState,
        mode: newMode,
      }));
    }
  };

  return (
    <GlobalContext.Provider value={[globalState, updateMode]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
