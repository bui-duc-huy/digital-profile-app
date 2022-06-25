import React, { useContext, useState } from "react"

const IdentityContext = useContext({})

const identityContextValue = () => {

}

export const useIdentity = () => useContext(IdentityContext);

export const IdentityContextProvider = ({ children }) => {
  return (
    <IdentityContext.Provider value={identityContextValue()}>
      {children}
    </IdentityContext.Provider>
  );
};