import { useState } from 'react'
import axios, { Axios } from "axios"

export default function CreateMeeting() {
    const [req, setReq] = useState<any>(null)

 
  const handleButtonClick = () => { 
    axios.post('http://localhost:3000/meetings')
    .then((res) => {
        setReq(res.data)
    })
  }
  
  return (
   <>
   <div>
    <button 
    onClick={() => {handleButtonClick()}}> Create Meeting </button>
   </div>
   </> 
  )
}