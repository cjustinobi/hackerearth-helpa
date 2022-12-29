import {useState, useEffect, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getVendors, truncateAddr} from '../../utils'
import { login } from '../../services'
import { VendorListContext } from '../../contexts/AppContext'


import logo from '../../assets/img/logo.png'

const Header = ({ openVendorModal }) => {

  const navigate = useNavigate()

  const { vendors, setVendors } = useContext(VendorListContext)

  const [vendorExists] = useState(false)
  const [address, setAddress] = useState('')

  const connect = async () => {
    const res = await login()
    console.log(res)
    const vendors = await getVendors()
    setVendors(vendors)
    const addr = res.idToken.wallet_address
    localStorage.setItem('address', addr)
    setAddress(addr)
  }

  useEffect(() => {
    const addr = localStorage.getItem('address')
    if (addr) {
      setAddress(addr)
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
            <button onClick={connect} className={'banner-btn btn-address'}>
              {address ? `${truncateAddr(address)}` : 'Connect Wallet'}
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