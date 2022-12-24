import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import {
  customerTransactions,
  confirmService,
  transactionStatus,
  formatDate
} from '../../utils'

import logo from '../../assets/img/placeholder.jpg'

const Transactions = () => {

  const [transactions, setTransactions] = useState(undefined)

  const approveHandler = async (transIndex, vendorAddr) => {
    const res = await confirmService(transIndex, vendorAddr)
    console.log(res)
  }

  const getStatus = index => {
    transactionStatus(index)
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
                  <small>{item.status}</small>
                  <p><small>Amount: {ethers.utils.formatEther(item.amount.toNumber())}</small></p>
                  <small>Created {formatDate(item.dateCreated.toNumber())}</small><br/>
                  {/*{item.status === 'Completed' && <small>Completed {formatDate(item.dateCreated.toNumber())}</small>}*/}

            {/*      <a href="#" className="showcase-category">{vendor.businessName}</a>*/}

            {/*      <a href="#">*/}
            {/*        <h3 class="showcase-title">{vendor.profession}</h3>*/}
            {/*      </a>*/}


                  <div class="price-box">
                    {item.status === 'In Progress' &&
                    <button className="btn" onClick={() => approveHandler(item.transactionIndex, item.vendor)}>Confirm</button>
                    }
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