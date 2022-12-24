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
    <div className="product-container">

      <div className="container">

        <div className="product-main">

          <h2 className="title">My Transactions</h2>

          <div className="product-grid">

            {transactions && transactions.map(item => (

              <div className="showcase">

                <div className="showcase-banner">
                  <img src={logo} alt="transaction" width="300" />

                <div className="showcase-content">

                  <small>{item.status}</small>
                  <p><small>Amount: {ethers.utils.formatEther(item.amount.toNumber())}</small></p>
                  <small>Created {formatDate(item.dateCreated.toNumber())}</small><br/>
                  {/*{item.status === 'Completed' && <small>Completed {formatDate(item.dateCreated.toNumber())}</small>}*/}

                  <div className="price-box">
                    {(item.status === 'In Progress' || item.status === 'Reviewing') &&
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