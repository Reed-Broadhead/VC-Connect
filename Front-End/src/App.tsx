import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route } from 'react-router-dom'
import  CreateMeeting from './components/CreateMeeting'
import JoinMeeting from './components/JoinMeeting'

function App() {
  const [count, setCount] = useState(0)

  // const x = import.meta.env.API_KEY

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${import.meta.env.VITE_API_KEY}`)
  }, [])
 

  return (
    <>
     <Routes>
      <Route path="/" element={<CreateMeeting/>} />
      <Route path="/meeting" element={<JoinMeeting/>} />
     </Routes>
    </>
  )
}

export default App
