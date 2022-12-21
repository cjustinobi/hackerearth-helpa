import { useState, useEffect } from 'react'
import { BigNumber, ethers } from 'ethers'
import { createTransaction, getVendors } from '../utils'

const Vendors = () => {

  const [vendors, setVendors] = useState(undefined)

  const transactionHandler = async (vendorIndex, vendorAddr, amount) => {
    const res = await createTransaction(vendorIndex, vendorAddr, amount)
    console.log(res)
  }

  useEffect( () => {

    const vendorsHandler = async () => {

      const res = await getVendors()
      setVendors(res)

    }

    vendorsHandler()

  }, [getVendors])

  return (
    <div className="product-container">

      <div className="container">

        <div className="product-main">

          <h2 className="title">Service Providers</h2>

          <div className="product-grid">

          {vendors && vendors.map((vendor, i) => (

            <div className="showcase" key={i}>

              <div className="showcase-banner">

                {/*<img src="../hack/images (1).jpg" alt="Mens Winter Leathers Jackets" width="300" className="product-img default">*/}
                {/*  <img src="../hack/download (1).jpg" alt="Mens Winter Leathers Jackets" width="300" className="product-img hover" style="transform: scale(0.9);">*/}

                <div className="showcase-actions">

                  <a href="../profile/profile 1/index.html">
                    <button className="btn-action">
                      <ion-icon name="person-outline"></ion-icon>
                    </button>
                  </a>

                </div>

              </div>

              <div className="showcase-content">

                <a href="#" className="showcase-category">{vendor.businessName}</a>

                <a href="#">
                  <h3 className="showcase-title">{vendor.profession}</h3>
                </a>
                <p>Completed: {vendor.transactionCount}</p>
                <p>Sales: {vendor.totalAmount.toNumber()}</p>

                <div className="price-box">
                  <p className="price">{ethers.utils.formatEther(BigNumber.from(vendor.price))}</p>
                  <button className="btn" onClick={() => transactionHandler(vendor.vendorIndex, vendor.vendorAddress, vendor.price)}>Hire</button>
                </div>

              </div>

            </div>
          ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Vendors