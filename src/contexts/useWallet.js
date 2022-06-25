import React, { createContext, useContext, useState } from "react"

const WalletContext = createContext({})

const { ethereum } = window

const WalletContextValue = () => {
  const [address, setAddress] = useState()

  const isInstallWallet = () => {
    return !!ethereum
  }

  return {
    isInstallWallet
  }
}

export const useWallet = () => useContext(WalletContext);

export const WalletContextProvider = ({ children }) => {
  return (
    <WalletContext.Provider value={WalletContextValue()}>
      {children}
    </WalletContext.Provider>
  );
};