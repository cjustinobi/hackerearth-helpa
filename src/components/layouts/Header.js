import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'

const Header = ({ openVendorModal }) => {
  return (
    <header>

      <div class="header-main">

        <div class="container">

          <Link to='/' className="header-logo">
            <img src={logo} alt="" width="100px" />
          </Link>

          <div className={'links'}>
            <Link to='/my-jobs'>My Jobs</Link>
            <Link to='/my-transactions'>My Transactions</Link>
          </div>

          <div class="header-user-actions">

            {/*<button className={'action-btn'} onClick={() => openTransactionModal()} >create tx</button>*/}
            <button className={'banner-btn'} onClick={() => openVendorModal()} >Create Account</button>
          </div>

        </div>

      </div>

      <div class="mobile-bottom-navigation">

        <button className="action-btn" data-mobile-menu-open-btn>
          <ion-icon name="menu-outline"></ion-icon>
          one
        </button>


        <button className="action-btn">
          <ion-icon name="home-outline"></ion-icon> two
        </button>

        <button className="action-btn" data-mobile-menu-open-btn>
          <ion-icon name="grid-outline"></ion-icon> tjhree
        </button>

      </div>

      <nav class="mobile-navigation-menu  has-scrollbar" data-mobile-menu>

        <div class="menu-top">
          <h2 class="menu-title">Menu</h2>

          <button className="menu-close-btn" data-mobile-menu-close-btn>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <ul class="mobile-menu-category-list">

          <li className="menu-category">
            <a href="#" className="menu-title">Home</a>
          </li>
        </ul>

        <div class="menu-bottom">

          <ul class="menu-category-list">

            <li className="menu-category">

              <button className="accordion-menu" data-accordion-btn>
                <p class="menu-title">Language</p>

                <ion-icon name="caret-back-outline" className="caret-back"></ion-icon>
              </button>

              <ul class="submenu-category-list" data-accordion>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">English</a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">Espa&ntilde;ol</a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">Fren&ccedil;h</a>
                </li>

              </ul>

            </li>

            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p class="menu-title">Currency</p>
                <ion-icon name="caret-back-outline" className="caret-back"></ion-icon>
              </button>

              <ul class="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">USD &dollar;</a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">EUR &euro;</a>
                </li>
              </ul>
            </li>

          </ul>

          <ul class="menu-social-container">

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>

          </ul>

        </div>

      </nav>

    </header>
  )
}

export default Header