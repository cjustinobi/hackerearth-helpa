import { useState } from 'react'
import { createVendor } from '../../utils'

const VendorModal = ({ closeTxModal }) => {

  const [businessName, setBusinessName] = useState('')
  const [profession, setProfession] = useState('')
  const [logoPath, setLogoPath] = useState('')
  const [serviceCharge, setServiceCharge] = useState('')
  const [domain, setDomain] = useState('')
  const [description, setDescription] = useState('')

  const createVendorHandler = async () => {
    const res = await createVendor(businessName, profession, domain, logoPath, description, serviceCharge)
    console.log('vendor created ', res)
  }

 return (
   <div>
     <input onChange={e => setBusinessName(e.target.value)} placeholder={'Business name'}/>
     <select onChange={e => setProfession(e.target.value)}>
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
     <input onChange={e => setDescription(e.target.value)} placeholder={'Description'}/>
     <button onClick={createVendorHandler}>Submit</button>
     <button onClick={() => closeTxModal()}>close</button>
   </div>
 )
}

export default VendorModal