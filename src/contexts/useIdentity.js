import React, { createContext, useContext, useState } from "react"
import { useApi } from "../hooks/useApi"

const IdentityContext = createContext({})

const IdentityContextValue = () => {
  const API = useApi()
  const [identity, setIdentity] = useState()

  const getIdentity = async ({ address }) => {
    const identityDetail = await API.getIdentity({ address })
    setIdentity(identityDetail.data)

    return identityDetail.data
  }

  return {
    identity,
    getIdentity
  }
}

export const useIdentity = () => useContext(IdentityContext);

export const IdentityContextProvider = ({ children }) => {
  return (
    <IdentityContext.Provider value={IdentityContextValue()}>
      {children}
    </IdentityContext.Provider>
  );
};