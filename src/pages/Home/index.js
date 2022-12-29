import { useContext, useEffect, useState } from 'react'
import { lowerCaseAddr, requestAccount } from '../../utils'
import Vendors from '../../components/Vendors'
import { VendorListContext } from '../../contexts/AppContext'

import hero from '../../assets/img/hero.png'

const Home = ({openVendorModal}) => {

  const { vendors } = useContext(VendorListContext)

  const [address, setAddress] = useState(undefined)
  const [setVendorExists] = useState(false)

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

  }, [address, vendors, setVendorExists])

  return (
    <main>
      <div className="banner">

        <div className="container">

          <div className="slider-container has-scrollbar">

            <div className="slider-item">

              <img src={hero} alt="women's latest fashion sale" className="banner-img" />

              <div className="banner-content">

                <h2 className="banner-title">Getting Tech Artisans shouldn't be hard</h2>

                <p className="banner-text">
                  Focus on what matters!
                </p>

                <button onClick={() => openVendorModal()} className="banner-btn">
                  Create Account
                </button>

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