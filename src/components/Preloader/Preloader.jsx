import React from 'react'
import { assets } from '../../assets/assets'
import "./Preloader.css"

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={assets.anim_logo} alt="Image not found"  />
    </div>
  )
}

export default Preloader
