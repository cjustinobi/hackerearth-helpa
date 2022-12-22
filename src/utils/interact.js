import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import HelpaJson from '../artifacts/contracts/Helpa.sol/Helpa.json'

const contractAddress = '0xA5D09a1efcB8B246226f21347DEAE3B1632D4634'
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contractSigner = new ethers.Contract(contractAddress, HelpaJson.abi, signer)
const contract = new ethers.Contract(contractAddress, HelpaJson.abi, provider);



async function requestAccount() {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
    alert('Login to Metamask first');
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
    const result = await Promise.all(transactions)
    return result

  }
}


export const createTransaction = async (vendorIndex, vendorAddress, amount) => {

  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    try {
      let a = new BigNumber(amount).shiftedBy(18).toString()
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



export const createVendor = async (businessName, profession, domain, logoPath, desc, amount) => {


  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    try {

      const txHash = await contractSigner.createVendor(
        businessName,
        profession,
        domain,
        logoPath,
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

// export const confirmService = async (transIndex, status) => {
export const confirmService = async (transIndex) => {

  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    let txHash = await contractSigner.confirmService(transIndex)

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