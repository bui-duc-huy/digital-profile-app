import React, { createContext, useContext, useState } from "react"

const WalletContext = createContext({})

const { ethereum } = window

const WalletContextValue = () => {
  const [address, setAddress] = useState()

  const isInstallWallet = () => {
    return !!ethereum
  }

  const isConnected = () => {
    return !!address
  }

  const connect = async () => {
    const accounts = (await window.ethereum.request({ method: 'eth_requestAccounts' }))
    setAddress(accounts[0])

    return accounts[0]
  }

  const sendTransaction = async ({ toAddress, data, value }) => {

  }

  return {
    address,
    isInstallWallet,
    isConnected,
    connect
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