import { ethers } from 'ethers'
import { pascalToWord, TRANSACTION_STATUS } from '../utils'
import HelpaJson from '../artifacts/contracts/Helpa.sol/Helpa.json'

const contractAddress = '0x4A6354d560d1E01ed3D1cF5Cb2a9E7fe4218627E'
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contractSigner = new ethers.Contract(contractAddress, HelpaJson.abi, signer)
const contract = new ethers.Contract(contractAddress, HelpaJson.abi, provider);



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


export const test = async () => {

  if (typeof window.ethereum !== "undefined") {
    await requestAccount()

    try {
      // const res = await contract.getTransactions(0)
      // const res = await contract.getTransactionCount()
      const res = await contract.getBal()
      console.log(res.toNumber())
      // console.log(res)
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}