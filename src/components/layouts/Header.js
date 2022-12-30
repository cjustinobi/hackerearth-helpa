import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getVendors } from '../../utils'
import { login, logout } from '../../services'
import { VendorListContext } from '../../contexts/AppContext'


import logo from '../../assets/img/logo.png'

const Header = ({ openVendorModal }) => {

  const navigate = useNavigate()

  const { setVendors } = useContext(VendorListContext)

  const [vendorExists] = useState(false)
  const [address, setAddress] = useState('')

  const toggleConnect = async () => {

    const result = localStorage.getItem('sub')

    if (result) {

      await logout()
      localStorage.clear()
      setAddress('')

    } else {

      const res = await login()
      console.log(res)
      const vendors = await getVendors()
      setVendors(vendors)
      const addr = res.idToken.sub
      localStorage.setItem('sub', addr)
      setAddress(addr)
    }


  }

  const openVendorModalHandler = async () => {
    const addr = localStorage.getItem('sub')

    if (!addr) {
      let res = new Promise(async resolve => {
        const r = await login()
        resolve(r)
      })

      res = await res
      if (res) {
        localStorage.setItem('sub', res.data.idToken.sub)
        openVendorModal()
      }

    } else {
      openVendorModal()
    }

  }

  useEffect(() => {
    const sub = localStorage.getItem('sub')
    if (sub) {
      setAddress(sub)
    }
  }, [setAddress])

  return (
    <header>

      <div className="header-main">

        <div className="container">

          <Link to='/' className="header-logo">
            <img src={logo} alt="" width="100px" />
          </Link>

          <div className={'links'}>
            <Link to='/my-jobs'>My Jobs</Link>
            <Link to='/my-transactions'>My Transactions</Link>
          </div>

          <div className="header-user-actions">
            <button onClick={toggleConnect} className={'banner-btn btn-address'}>
              {/*{address ? `${truncateAddr(address)}` : 'Connect Wallet'}*/}
              {address ? `${address} - Disconnect` : 'Connect Wallet'}
            </button>
            {!vendorExists && <button className={'banner-btn'} onClick={openVendorModalHandler} >
              Create Account
            </button>}
          </div>

          <div className="mobile-btns">
            <button onClick={toggleConnect} className={'banner-btn btn-address'}>
              {/*{address ? truncateAddr(address) : 'Connect Wallet'}*/}
              {address ? `${address} - Disconnect` : 'Connect Wallet'}
            </button>
            {!vendorExists && <button className={'banner-btn'} onClick={openVendorModalHandler} >
              Create Account
            </button>}
          </div>

        </div>

      </div>

      <div className="mobile-bottom-navigation">

        <button onClick={() => navigate('/')} className="action-btn">
          <ion-icon name="home-outline"></ion-icon>
        </button>

        <button onClick={() => navigate('/my-jobs')} className="action-btn" data-mobile-menu-open-btn>
          <ion-icon name="construct-outline"></ion-icon>
        </button>


        <button onClick={() => navigate('/my-transactions')} className="action-btn" data-mobile-menu-open-btn>
          <ion-icon name="list-outline"></ion-icon>
        </button>

      </div>

    </header>
  )
}

export default Header