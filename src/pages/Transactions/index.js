import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { customerTransactions, confirmService } from '../../utils'

import logo from '../../assets/img/placeholder.jpg'

const Transactions = () => {

  const [transactions, setTransactions] = useState(undefined)

  const approveHandler = async transIndex => {
    const res = await confirmService(transIndex)
    console.log(res)
  }


  useEffect( () => {

    const transactionsHandler = async () => {

      const res = await customerTransactions()
      console.log('res ', res)
      setTransactions(res)

    }

    transactionsHandler()

  }, [])

  return (
    <div class="product-container">

      <div class="container">

        <div class="product-main">

          <h2 class="title">My Transactions</h2>

          <div class="product-grid">

            {transactions && transactions.map(item => (

              <div class="showcase">

                <div class="showcase-banner">



                  {/*  <img src="../hack/download (1).jpg" alt="Mens Winter Leathers Jackets" width="300" class="product-img hover" style="transform: scale(0.9);">*/}

            {/*      <div class="showcase-actions">*/}

            {/*        <a href="../profile/profile 1/index.html">*/}
            {/*          <button className="btn-action">*/}
            {/*            <ion-icon name="person-outline"></ion-icon>*/}
            {/*          </button>*/}
            {/*        </a>*/}

            {/*      </div>*/}

            {/*    </div>*/}

                <div class="showcase-content">
                  <p><small>Sales: {ethers.utils.formatEther(item.amount.toNumber())}</small></p>

            {/*      <a href="#" className="showcase-category">{vendor.businessName}</a>*/}

            {/*      <a href="#">*/}
            {/*        <h3 class="showcase-title">{vendor.profession}</h3>*/}
            {/*      </a>*/}


                  <div class="price-box">
                    {/*<p class="price">{ethers.utils.formatEther(vendor.price.toNumber())}</p>*/}
                    <button className="btn" onClick={() => approveHandler(item.transactionIndex)}>Confirm</button>
                  </div>
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

export default Transactions