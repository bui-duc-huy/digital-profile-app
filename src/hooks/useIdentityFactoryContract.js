import Web3 from "web3"
import IdentityFactoryAbi from "../abis/IdentityFactory.abi"
import { useWallet } from "../contexts/useWallet"
import { IDENTITY_FACTORY_ADDRESS } from "../environments"

const web3 = new Web3()

export const useIdentityFactoryContract = () => {
  const wallet = useWallet()
  const IdentityFactoryContract = new web3.eth.Contract(IdentityFactoryAbi, IDENTITY_FACTORY_ADDRESS)

  const getIdentityAddress = async ({ email }) => {
    const nonce = web3.utils.sha3(email)

    const data = await IdentityFactoryContract.methods.getAddress(wallet.address, nonce).encodeABI()

    const response = await wallet.ethCall({
      to: IDENTITY_FACTORY_ADDRESS,
      data,
    })

    return `0x${response.slice(26)}`
  }

  const deployIdentity = async ({ email }) => {
    const nonce = web3.utils.sha3(email)
    const data = IdentityFactoryContract.methods.deploy(wallet.address, nonce).encodeABI()

    const transactionHash = await wallet.sendTransaction({
      to: IDENTITY_FACTORY_ADDRESS,
      data,
      value: 0,
    })

    return {
      transactionHash,
    }
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
