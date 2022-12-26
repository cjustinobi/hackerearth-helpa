import {useState, useEffect, useContext} from 'react'
import { BigNumber, ethers } from 'ethers'
import { createTransaction, getVendors, PINATA_GATEWAY } from '../utils'
import { AppContext } from '../contexts/AppContext'

const Vendors = () => {

  const {updateVendor, setUpdateVendor} = useContext(AppContext)

  const [vendors, setVendors] = useState(undefined)

  const transactionHandler = async (vendorIndex, vendorAddr, amount) => {
    const res = await createTransaction(vendorIndex, vendorAddr, amount)
    console.log(res)
  }

  // const testHandler = async () => {
  //   const res = await test()
  //   console.log(res)
  // }

  useEffect( () => {

    const vendorsHandler = async () => {

      const res = await getVendors()
      if (res) {
        setUpdateVendor(false)
      }
      setVendors(res)

    }

    if (updateVendor) {
      vendorsHandler()
    }

    vendorsHandler()

  }, [updateVendor, setUpdateVendor])

  return (
    <div className="product-container">

      <div className="container">

        <div className="product-main">

          <h2 className="title">Service Providers</h2>

          <div className="product-grid">
            {/*<button onClick={testHandler}>Test</button>*/}
          {vendors && vendors.map((vendor, i) => (

            <div className="showcase" key={i}>

              <div className="showcase-banner">

                <img src={`${PINATA_GATEWAY}/${vendor.CID}`} alt="My logo" width="300" className="product-img default"/>

                <div className="product-img hover">
                  <p>{vendor.description}</p>
                </div>


              </div>

              <div className="showcase-content">

                <p className="showcase-category">{vendor.businessName}</p>
                <h3 className="showcase-title">{vendor.profession}</h3>
                <p><small>Completed Transactions:</small> {vendor.transCount.toNumber()}</p>
                <p><small>Sales: {ethers.utils.formatEther(vendor.totalAmount.toNumber())}</small></p>

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