import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import HelpaJson from '../artifacts/contracts/Helpa.sol/Helpa.json'

const contractAddress = '0x7C8d36BA3F88a13251b540bdD5FbAD6A7AaBba4d'
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

export const getTransactions = async (vendor,) => {


  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    try {

      const txHash = await contractSigner.getTransaction(vendor)
      return await txHash.wait()

    } catch (err) {
      console.log('Error: ', err);
    }
  }
}



export const createTransaction = async (vendorIndex, vendorAddress, amount) => {
console.log(amount.toNumber().toString())
  alert(vendorIndex)
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

export const getTransactionCount = async () => {


  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()

    try {

      return await contract.getTransactionCount()

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
      console.log('vendorss ', res)
      vendors.push(res)
    }

    return vendors

  }
}