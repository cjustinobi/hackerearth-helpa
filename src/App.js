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
import TransactionModal from './components/layouts/TransactionModal'
import VendorModal from './components/layouts/VendorModal'

Modal.setAppElement('#root');

function App() {

  useExternalScripts('./assets/js/script')
  useExternalScripts('https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js')



  const login = () => {
    const res = loginWithUD()
    console.log(res)

  }

  // const updateTransaction = async () => {
  //
  //   if (typeof window.ethereum !== "undefined") {
  //     await requestAccount()
  //
  //     const signer = provider.getSigner()
  //     const forTx = new ethers.Contract(contractAddress, HelpaJson.abi, signer)
  //
  //     try {
  //
  //       const txHash = await forTx.updateTransaction('0', true)
  //       const res = await txHash.wait()
  //       console.log(res)
  //     } catch (err) {
  //       console.log("Error: ", err);
  //     }
  //   }
  // }



  // const test = async () => {
  //
  //   if (typeof window.ethereum !== "undefined") {
  //     await requestAccount()
  //
  //     try {
  //       const signer = provider.getSigner()
  //       const forTx = new ethers.Contract(contractAddress, HelpaJson.abi, signer)
  //       const res = await contract.getTransactions(0)
  //       // const res = await contract.getTransactionCount()
  //       // const res = await contract.getBal()
  //       // console.log(res.toNumber())
  //       console.log(res)
  //     } catch (err) {
  //       console.log("Error: ", err);
  //     }
  //   }
  // }



  const [modalTxIsOpen, setTxIsOpen] = useState(false);
  const [modalVendorIsOpen, setVendorIsOpen] = useState(false);

  function openTransactionModal() {
    setTxIsOpen(true);
  }

  function openVendorModal() {
    setVendorIsOpen(true);
  }


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeTxModal() {
    setTxIsOpen(false);
  }

  function closeVendorModal() {
    setVendorIsOpen(false);
  }

  return (
    <Router>
      <div class="overlay" data-overlay></div>

      <Header openVendorModal={openVendorModal} openTransactionModal={openTransactionModal} />

    <div>
      {/*<button onClick={test}>Test</button>*/}
      {/*<button onClick={createTransaction}>Create Transaction</button>*/}
      {/*<button onClick={updateTransaction}>Update transaction</button>*/}

      <Modal
        isOpen={modalTxIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeTxModal}
        style={modalCustomStyles}
        contentLabel="Example Modal"
      >
        {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>*/}
        <TransactionModal closeTxModal={closeTxModal} />

      </Modal>

      <Modal
        isOpen={modalVendorIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeVendorModal}
        style={modalCustomStyles}
        contentLabel="Vendor Modal"
      >
        {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>*/}
        <VendorModal closeTxModal={closeVendorModal} />

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
