import Vendors from '../../components/Vendors'
import hero from '../../assets/img/hero.jpg'


const Home = () => {
  return (
    <main>
      <div className="banner">

        <div className="container">

          <div className="slider-container has-scrollbar">

            <div className="slider-item">

              <img src={hero} alt="women's latest fashion sale" className="banner-img" />

              <div className="banner-content">

                <p className="banner-subtitle">NEW</p>

                <h2 className="banner-title">Cleaning Service Bonus</h2>

                <p className="banner-text">
                  starting at &dollar; <b>399</b>.99
                </p>

                <a href="#" className="banner-btn">Shop now</a>

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