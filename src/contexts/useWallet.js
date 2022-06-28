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
    const accounts = (await ethereum.request({ method: 'eth_requestAccounts' }))
    setAddress(accounts[0])

    return accounts[0]
  }

  const sendTransaction = async ({ to, data, value }) => {
    const transactionParameters = {
      to, // Required except during contract publications.
      from: address, // must match user's active address.
      value, // Only required to send ether to the recipient from the initiating external account.
      data, // Optional, but used for defining smart contract creation and interaction.
    };

    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    return txHash
  }

  const ethCall = async ({ to, data }) => {
    const transactionParameters = {
      to, // Required except during contract publications.
      from: address, // must match user's active address.
      data, // Optional, but used for defining smart contract creation and interaction.
    };

    const response = await ethereum.request({
      method: 'eth_call',
      params: [transactionParameters],
    });

    return response
  }

  return {
    address,
    isInstallWallet,
    isConnected,
    connect,
    sendTransaction,
    ethCall
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