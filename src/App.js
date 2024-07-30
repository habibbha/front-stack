
import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Categories from './pages/Categories/Categories'
import Contact from "./pages/Contact/Contact"
import Footer from './components/Footer/Footer'
import { useState,useEffect } from "react"
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import NewCollection from './pages/NewCollection/NewCollection'
import BestSellers from './pages/BestSellers/BestSellers'
import Discounts from './pages/Discounts/Discounts'
import Profile from './components/Profile'
import Download from './components/Download/Download'
import Preloader from './components/Preloader/Preloader'




const App = () => {
const [showLogin ,setShowLogin]= useState(false)
const [showRegister,setShowRegister]=useState(false)
const [loading , setLoading] = useState(false)
useEffect(()=>{

  setLoading(true)
  setTimeout(()=>{
    setLoading(false)

  },3900)

},[])

  return (
    <>
    
    <div className ="app">

      {
        loading ?
        <Preloader  loading = {loading} />
        :
        <div>
      <Navbar setShowLogin={setShowLogin} setShowRegister={setShowRegister}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/newcollection" element={<NewCollection/>} />
        <Route path="/bestsellers" element={<BestSellers/>} />
        <Route path="/discounts" element={<Discounts/>} />
        <Route path="/download" element={<Download/>} />
        

        
     
      </Routes>
      
      <Footer />
      </div>
        
      }
 
    </div>
 
 </>
  )
}

export default App