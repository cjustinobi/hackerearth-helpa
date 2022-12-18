
import { createTransaction } from '../../utils'

const TransactionModal = ({ closeTxModal }) => {
 return (
   <div>
     <input type="text"/>
     <button onClick={() => closeTxModal()}>close</button>
   </div>
 )
}

export default TransactionModal