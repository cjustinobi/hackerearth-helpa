import { ethers } from 'ethers'
import { pascalToWord, TRANSACTION_STATUS } from '../utils'
import HelpaJson from '../artifacts/contracts/Helpa.sol/Helpa.json'

const contractAddress = '0xa42e8974dfd120EE28f6eeB8aB300145392E78Aa'
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contractSigner = new ethers.Contract(contractAddress, HelpaJson.abi, signer)
const contract = new ethers.Contract(contractAddress, HelpaJson.abi, provider)

export async function requestAccount() {
  try {
    return await window.ethereum.request({ method: 'eth_requestAccounts' })
  } catch (error) {
    console.error(error);
    console.log('Login to Metamask first')
  }
}

export const customerTransactions = async () => {


  if (typeof window.ethereum !== 'undefined') {

    await requestAccount()

    const count = await contractSigner.getTransactionCount()

    let transactions = []

    for (let i = 0; i < count; i++) {

      try {

        let tnx = new Promise(async resolve => {
          const res = await contractSigner.getTransactions(i)
          resolve(res)
        })
        transactions.push(tnx)

      } catch (err) {
        console.log('Error: ', err);
      }

    }
    let result = await Promise.all(transactions)

    return result.map(item => ({...item, status: pascalToWord(TRANSACTION_STATUS(item.status)).trim()}))

  }
}


export const vendorTransactions = async () => {


  if (typeof window.ethereum !== 'undefined') {

    await requestAccount()

    const count = await contractSigner.getVendorTransactionCount()

    let transactions = []

    for (let i = 0; i < count; i++) {

      try {

        let tnx = new Promise(async resolve => {
          const res = await contractSigner.getVendorTransactions(i)
          resolve(res)
        })
        transactions.push(tnx)

      } catch (err) {
        console.log('Error: ', err);
      }

    }
    let result = await Promise.all(transactions)

    return result.map(item => ({...item, status: pascalToWord(TRANSACTION_STATUS(item.status)).trim()}))

  }
}


export const createTransaction = async (vendorIndex, vendorAddress, amount) => {

  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    try {
      const txHash = await contractSigner.createTransaction(
        vendorIndex,
        vendorAddress,
        {
          value: amount.toNumber().toString()

        }
      )
      return await txHash.wait()

    } catch (err) {
      console.log('Error: ', err);
    }
  }
}



export const createVendor = async (businessName, profession, domain, CID, desc, amount) => {


  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    try {

      const txHash = await contractSigner.createVendor(
        businessName,
        profession,
        domain,
        CID,
        desc,
        ethers.utils.parseEther(amount)
      )
      return await txHash.wait()

    } catch (err) {
      console.log('Error: ', err);
    }
  }
}

export const getVendorCount = async () => {


  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    try {
      
      return await contract.getVendorCount()

    } catch (err) {
      console.log('Error: ', err);
    }
  }
}

export const getVendors = async () => {

  const vendorCount = await getVendorCount()

  if (!vendorCount) return false

  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    let vendors = []

    for (let i = 0; i < vendorCount; i++) {
      let res = await contract.getVendors(i)
      res = { ...res }
      res.vendorIndex = i
      vendors.push(res)
    }

    return vendors

  }
}

export const confirmService = async (transIndex, vendorAddr) => {

  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    let txHash = await contractSigner.confirmService(transIndex, vendorAddr)

    return await txHash.wait()

  }
}

export const forReview = async (transIndex, customerAddr) => {

  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    let txHash = await contractSigner.serviceReviewing(transIndex, customerAddr)

    return await txHash.wait()

  }
}



export const sendTx = async  (receiver, amount) => {

  const ethereum = window.ethereum;

  if(ethereum){

    try{
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      const transaction = [{
        from: accounts[0],
        to: receiver,
        value: ethers.utils.parseUnits(amount, 'ether').toHexString()
      }]

      const transactionHash = await provider.send('eth_sendTransaction', transaction)
      console.log(`Txn Hash: ${transactionHash}`)
      return transactionHash
    } catch(err){
      console.log(err)
    }
  } else {
    console.log('Metamask not detected')
  }

}