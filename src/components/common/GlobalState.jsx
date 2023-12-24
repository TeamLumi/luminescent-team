import React, { useState, createContext, useContext } from "react";

const GlobalContext = createContext(null);

export const GlobalState = (props) => {
  const [globalState, setGlobalState] = useState({ mode: "3.0" });

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
