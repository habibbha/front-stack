import React from 'react'
import './Download.css'
import { assets } from '../../assets/assets'

const Download = () => {
    return (
        <div className='app-download' id='download'>
            <p>* For Better Experience Download <br />BrimaSouk App .! *</p>
            <div className="app-download-platforms">
                <img src={assets.play} alt="" />
                <img src={assets.app} alt="" />
            </div>
        </div>
    )
}

export default Download
