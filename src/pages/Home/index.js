import Vendors from '../../components/Vendors'
import hero from '../../assets/img/hero.jpg'


const Home = ({openVendorModal}) => {
  return (
    <main>
      <div className="banner">

        <div className="container">

          <div className="slider-container has-scrollbar">

            <div className="slider-item">

              <img src={hero} alt="women's latest fashion sale" className="banner-img" />

              <div className="banner-content">

                {/*<p className="banner-subtitle">NEW</p>*/}

                <h2 className="banner-title">Getting Tech Artisans should'nt be hard</h2>

                <p className="banner-text">
                  starting at &dollar; <b>399</b>.99
                </p>

                <button onClick={() => openVendorModal()} className="banner-btn">Create Account</button>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Vendors />


    </main>
  )
}

export default Home