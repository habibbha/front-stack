import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='contact'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img  src={assets.logo} alt="Logo" className="logo" />
            <p style={{color:'rgb(109, 158, 219)'}}>* BrimaSouk was born out of a passion for preserving the art of handmade creations. Each product in our collection tells a unique story, crafted by skilled artisans who pour their heart and soul into their work.</p>
            <div className="footer-social-icons">
                <div className="icon-circle">
                  <FontAwesomeIcon icon={faFacebookF} />
                </div>
                <div className="icon-circle">
                  <FontAwesomeIcon icon={faTwitter} />
                </div>
                <div className="icon-circle">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </div>
            </div>
        </div>
        <div className="footer-content-center">
            <h2 className="footer-title1">Powered By Habib !</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Our Services</li>
                <li>Contact Us</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2 className="footer-title2">Get In Touch !</h2>
            <ul>
                <li>+216 99 999 999</li>
                <li>Contact@BrimaSouk.com</li>
            </ul>
        </div>
      </div>
      <hr className="hrh"/>
      <p className="footer-copyright">Copyright 2024 © All Rights Reserved.</p>
    </div>
  )
}

export default Footer;
