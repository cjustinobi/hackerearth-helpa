import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { getTransactions, getTransactionCount } from '../../utils'

const Transactions = () => {

  const [transactions, setTransactions] = useState(undefined)


  useEffect( () => {

    const transactionsHandler = async () => {

      const res = await getTransactionCount()
      // const res = await getTransactions()
      console.log('res ', res.toNumber())
      setTransactions(res)

    }

    transactionsHandler()

  }, [getTransactions])

  return (
    <div class="product-container">

      <div class="container">

        <div class="product-main">

          <h2 class="title">Service Providers</h2>

          <div class="product-grid">

            {/*{transactions && transactions.map(vendor => (*/}

            {/*  <div class="showcase">*/}

            {/*    <div class="showcase-banner">*/}

            {/*      /!*<img src="../hack/images (1).jpg" alt="Mens Winter Leathers Jackets" width="300" class="product-img default">*!/*/}
            {/*      /!*  <img src="../hack/download (1).jpg" alt="Mens Winter Leathers Jackets" width="300" class="product-img hover" style="transform: scale(0.9);">*!/*/}

            {/*      <div class="showcase-actions">*/}

            {/*        <a href="../profile/profile 1/index.html">*/}
            {/*          <button className="btn-action">*/}
            {/*            <ion-icon name="person-outline"></ion-icon>*/}
            {/*          </button>*/}
            {/*        </a>*/}

            {/*      </div>*/}

            {/*    </div>*/}

            {/*    <div class="showcase-content">*/}

            {/*      <a href="#" className="showcase-category">{vendor.businessName}</a>*/}

            {/*      <a href="#">*/}
            {/*        <h3 class="showcase-title">{vendor.profession}</h3>*/}
            {/*      </a>*/}


            {/*      <div class="price-box">*/}
            {/*        /!*<p class="price">{ethers.utils.formatEther(vendor.price.toNumber())}</p>*!/*/}
            {/*        /!*<button className="btn" onClick={() => transactionHandler(vendor.vendorAddress, vendor.price)}>Hire</button>*!/*/}
            {/*      </div>*/}

            {/*    </div>*/}

            {/*  </div>*/}
            {/*))}*/}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Transactions