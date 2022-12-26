import {useState, useEffect, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { requestAccount, truncateAddr, lowerCaseAddr } from '../../utils'
import { VendorListContext } from '../../contexts/AppContext'

import logo from '../../assets/img/logo.png'

const Header = ({ openVendorModal }) => {

  const navigate = useNavigate()

  const { vendors } = useContext(VendorListContext)

  const [address, setAddress] = useState(undefined)
  const [vendorExists, setVendorExists] = useState(false)

  const connect = () => {
    if (address) return
    requestAccount()
  }

  useEffect(() => {
    const getAccount = async () => {
      const res = await requestAccount()
      setAddress(res[0])
    }

    getAccount()

    if (address && vendors) {
      const vendor = vendors.find(v => lowerCaseAddr(v.vendorAddress) === address)
      if (vendor) {
        setVendorExists(true)
      }
    }

  }, [address, vendors])

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
            <button onClick={connect} className={'banner-btn btn-address'}>
              {address ? truncateAddr(address) : 'Connect Wallet'}
            </button>
            {!vendorExists && <button className={'banner-btn'} onClick={() => openVendorModal()} >
              Create Account
            </button>}
          </div>

          <div className="mobile-btns">
            <button onClick={connect} className={'banner-btn btn-address'}>
              {address ? truncateAddr(address) : 'Connect Wallet'}
            </button>
            {!vendorExists && <button className={'banner-btn'} onClick={() => openVendorModal()} >
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