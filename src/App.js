import { useState } from 'react'
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Modal from 'react-modal';
import { ethers } from 'ethers'

import HelpaJson from './artifacts/contracts/Helpa.sol/Helpa.json'
import { loginWithUD } from './services'
import { modalCustomStyles } from './utils'
import useExternalScripts from "./hooks/useExternalScripts"

import Home from './pages/Home'
import Transactions from './pages/Transactions'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import AppModal from './components/layouts/AppModal'

const contractAddress = '0xfb0c428D610D2076A008cc2831Bc34fbE1DB59f0'

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, HelpaJson.abi, provider);



Modal.setAppElement('#root');

function App() {

  useExternalScripts('./assets/js/script')

  async function requestAccount() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log("error");
      console.error(error);
      alert("Login to Metamask first");
    }
  }

  const login = () => {
    const res = loginWithUD()
    console.log(res)

  }

  const updateTransaction = async () => {

    if (typeof window.ethereum !== "undefined") {
      await requestAccount()

      const signer = provider.getSigner()
      const forTx = new ethers.Contract(contractAddress, HelpaJson.abi, signer)

      try {

        const txHash = await forTx.updateTransaction('0', true)
        const res = await txHash.wait()
        console.log(res)
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  const createTransaction = async () => {


    if (typeof window.ethereum !== "undefined") {
      await requestAccount()

      const signer = provider.getSigner()
      const forTx = new ethers.Contract(contractAddress, HelpaJson.abi, signer)

      try {

        const txHash = await forTx.createTransaction(
          '0x9Edd3fb21e1BC3dBE3c5BCf8AB8044c706AAEA9C',
          '0x01a3f5cB1BCf260d12A2466cE075398aAB8cA610',
          false,
          {
            value: ethers.utils.parseEther("0.008")
          }
        )
        const res = await txHash.wait()
        console.log(res)
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  const test = async () => {

    if (typeof window.ethereum !== "undefined") {
      await requestAccount()

      try {
        const signer = provider.getSigner()
        const forTx = new ethers.Contract(contractAddress, HelpaJson.abi, signer)
        const res = await contract.getTransactions(0)
        // const res = await contract.getTransactionCount()
        // const res = await contract.getBal()
        // console.log(res.toNumber())
        console.log(res)
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }



  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Router>
      <div class="overlay" data-overlay></div>

      <Header openModal={openModal} />

    <div>
      <button onClick={test}>Test</button>
      <button onClick={createTransaction}>Create Transaction</button>
      <button onClick={updateTransaction}>Update transaction</button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalCustomStyles}
        contentLabel="Example Modal"
      >
        {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>*/}
        {/*<button onClick={closeModal}>close</button>*/}
        <AppModal closeModal={closeModal} />

      </Modal>

      <Link to='/'>Home</Link>
      <Link to='/transactions'>Transactions</Link>
    </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
      </Routes>
      {/*{addLibrary('./assets/js/script')}*/}
      <Footer />
    </Router>
  )
}

export default App
