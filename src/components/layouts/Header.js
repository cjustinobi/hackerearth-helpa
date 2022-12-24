import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'

const Header = ({ openVendorModal }) => {

  const navigate = useNavigate()

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

            {/*<button className={'action-btn'} onClick={() => openTransactionModal()} >create tx</button>*/}
            <button className={'banner-btn'} onClick={() => openVendorModal()} >Create Account</button>
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