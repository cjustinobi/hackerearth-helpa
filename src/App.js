import { useState } from 'react'
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Modal from 'react-modal'

import { loginWithUD } from './services'
import { modalCustomStyles, modalCustomStyles2 } from './utils'
import useExternalScripts from './hooks/useExternalScripts'
import useWindowSize from './hooks/useWindowSize'

import Home from './pages/Home'
import Jobs from './pages/Jobs'
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
  const size = useWindowSize()
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

      {/*<Modal*/}
      {/*  isOpen={modalTxIsOpen}*/}
      {/*  onAfterOpen={afterOpenModal}*/}
      {/*  onRequestClose={closeTxModal}*/}
      {/*  style={ size.width < 500 ? modalCustomStyles : modalCustomStyles2}*/}
      {/*  contentLabel="Example Modal"*/}
      {/*>*/}
      {/*  <TransactionModal closeTxModal={closeTxModal} />*/}

      {/*</Modal>*/}

      <Modal
        isOpen={modalVendorIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeVendorModal}
        style={ size.width < 500 ? modalCustomStyles : modalCustomStyles2}
        contentLabel="Vendor Modal"
      >
        <VendorModal closeTxModal={closeVendorModal} />

      </Modal>

    </div>
      <Routes>
        <Route path="/" element={<Home  openVendorModal={openVendorModal}/>}/>
        <Route path="/my-jobs" element={<Jobs/>}/>
        <Route path="/my-transactions" element={<Transactions/>}/>
      </Routes>
      {/*{addLibrary('./assets/js/script')}*/}
      <Footer />
    </Router>
  )
}

export default App
