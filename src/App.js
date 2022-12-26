import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Modal from 'react-modal'
import { VendorContext } from './contexts/AppContext'


// import { loginWithUD } from './services'
import { modalCustomStyles, modalCustomStyles2 } from './utils'
import useExternalScripts from './hooks/useExternalScripts'
import useWindowSize from './hooks/useWindowSize'

import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Transactions from './pages/Transactions'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import VendorModal from './components/layouts/VendorModal'

Modal.setAppElement('#root');

function App() {

  useExternalScripts('./assets/js/script')
  useExternalScripts('https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js')

  // const login = () => {
  //   const res = loginWithUD()
  //   console.log(res)
  // }

  const size = useWindowSize()
  const [updateVendor, setUpdateVendor] = useState(false)
  const [modalVendorIsOpen, setVendorIsOpen] = useState(false)

  function openVendorModal() {
    setVendorIsOpen(true);
  }


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeVendorModal() {
    setVendorIsOpen(false);
  }

  return (
    <VendorContext.Provider value={{updateVendor, setUpdateVendor}}>
      <div class="overlay" data-overlay></div>

      <Header openVendorModal={openVendorModal} />

    <div>

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
      <Footer />
    </VendorContext.Provider>
  )
}

export default App
