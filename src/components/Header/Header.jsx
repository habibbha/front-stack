
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import "./Header.css";
import Modal from './Modal/Modal';
import headerImg1 from '../../assets/header_img1.png';
import headerImg2 from '../../assets/header_img2.png';
import headerImg3 from '../../assets/header_img3.png';
import headerImg4 from '../../assets/header_img4.png';
import headerImg5 from '../../assets/header_img5.png';


const Header = () => {
  const backgrounds = [
    headerImg1,
    headerImg2,
    headerImg3,
    headerImg4,
    headerImg5

  ];



  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % backgrounds.length);
    }, 3000); // change every 3 sec

    return () => clearInterval(interval); // we clear interval on component unmount
  }, [backgrounds.length]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((currentIndex + 1) % backgrounds.length),
    onSwipedRight: () => setCurrentIndex((currentIndex - 1 + backgrounds.length) % backgrounds.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="header" {...handlers} style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }} id='hero'>
      <div className="header-contents">
        <h2>Explore the Berber masterpieces.!</h2>
        <p>"BrimaSouk" will take you through unique artistic creations, ranging from traditional architecture to jewelry, textiles, pottery, and other forms of craftsmanship.!</p>
         <button className="read" onClick={openModal}>Read More !</button>
               </div>
               {isModalOpen &&  <Modal onClose={closeModal} />}
    </div>
  );
}

export default Header;

