import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Homepage />
  
    </>
  )
}

export default App
