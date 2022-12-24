import { useState } from 'react'
import { createVendor } from '../../utils'

const VendorModal = ({ closeTxModal }) => {

  const [loading, setLoading] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [profession, setProfession] = useState('default')
  const [logoPath, setLogoPath] = useState('')
  const [serviceCharge, setServiceCharge] = useState('')
  const [domain, setDomain] = useState('')
  const [description, setDescription] = useState('')

  const createVendorHandler = async () => {
    setLoading(true)
    const res = await createVendor(businessName, profession, domain, logoPath, description, serviceCharge)
    if (res) {
      setLoading(false)
      document.getElementById('form').reset()
      closeModal()
    } else {
      setLoading(false)
    }
  }

  const closeModal = () => {
    closeTxModal()
  }

 return (
   <form id={'form'}>
     <input onChange={e => setBusinessName(e.target.value)} placeholder={'Business name'}/>
     <select value={profession} onChange={e => setProfession(e.target.value)}>
       <option value="default" disabled hidden>Select Skill</option>
       <option value="Software_Engineer">Software Engineer</option>
       <option value="Graphics Designer">Graphics Designer</option>
       <option value="UI/UX Designer">UI/UX Designer</option>
       <option value="DevOps Engineer">DevOps Engineer</option>
       <option value="Digital Marketer">Digital Marketer</option>
       <option value="Project Manager">Project Manager</option>
     </select>
     <input onChange={e => setLogoPath(e.target.value)} placeholder={'Business logo Path'}/>
     <input onChange={e => setDomain(e.target.value)} placeholder={'UD domain'}/>
     <input onChange={e => setServiceCharge(e.target.value)} placeholder={'Service charge'}/>
     <textarea minLength={10} maxLength={50} onChange={e => setDescription(e.target.value)} placeholder={'Description'}/>
     <div className={'modal-btns'}>
       <button className={'btn cancel'} onClick={closeModal}>Cancel</button>
       <button className={'btn'} type={'button'} onClick={createVendorHandler}>
         {loading ? 'Submitting' : 'Submit'}
       </button>
     </div>

   </form>
 )
}

export default VendorModal