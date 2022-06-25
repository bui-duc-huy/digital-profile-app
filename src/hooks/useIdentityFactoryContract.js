import Web3 from "web3"
import IdentityFactoryAbi from "../abis/IdentityFactory.abi"

import { IDENTITY_FACTORY_ADDRESS } from "../environments"

const web3 = new Web3()

export const useIdentityFactoryContract = (wallet) => {
  const IdentityFactoryContract = new web3.eth.Contract(IdentityFactoryAbi, IDENTITY_FACTORY_ADDRESS)

  const getIdentityAddress = async ({ email }) => {
    const nonce = web3.utils.sha3(email)

    const identityAddress = await IdentityFactoryContract.methods.getAddress(wallet.adress, nonce).call()
    return identityAddress
  }

  const deployIdentity = async ({ email }) => {
    const nonce = web3.utils.sha3(email)
    const response = IdentityFactoryContract.methods.deploy(wallet.address, nonce).encodeABI()
    console.log(response)

    return response
  }

  const getFactoryAddress = () => {
    return IDENTITY_FACTORY_ADDRESS
  }

  return {
    getIdentityAddress,
    deployIdentity,
    getFactoryAddress
  }
}
