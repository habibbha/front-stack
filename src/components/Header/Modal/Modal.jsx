import React from 'react';
import "./Modal.css";
import { assets } from '../../../assets/assets';

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="close-modal">
        <button className="modal-close" onClick={onClose}><img src={assets.remove_icon_yellow}alt="" /></button>
        </div>
        <img className="logo-img" src={assets.logo} alt="" />
        
        <div className="modal-body">
          <h4 className="modal-text"> " Introduction "</h4>
          <p className="modal-para">* Welcome to BrimaSouk, where tradition meets creativity. Our brand is dedicated to offering exquisitely handcrafted products that embody the essence of artisanal craftsmanship across various categories including Kids, Women, Men, Home Decoration, Beauty, and Gifts.</p>
          <h4 className="modal-text"> " Our Story "</h4>
          <p className="modal-para">* BrimaSouk was born out of a passion for preserving the art of handmade creations. Each product in our collection tells a unique story, crafted by skilled artisans who pour their heart and soul into their work.</p>
        </div>
        <div className="modal-category">
          <h3 className="cat-title">" Our Categories and Products "</h3><img src={assets.Kids} alt="" className="kids-img" />
          <h4 className="kids-title">Kids</h4>
          <ul className="cat-kids">
            <li className="text-kids">1 - Unique designs that combine comfort with traditional craftsmanship.</li>
            <li className="text-kids">2 - Beautifully crafted clothing made from soft, breathable fabrics.</li>
            
          </ul>
        </div>
        <div className="modal-category">
        <img src={assets.Women} alt="" className="women-img" />
          <h4 className="women-title">Women</h4>
          <ul className="cat-women">
            <li className="text-women">1 -  Exquisite handmade jewelry pieces, from delicate necklaces to statement earrings.</li>
            <li className="text-women">2 -  Each piece reflects the artisan's intricate craftsmanship and attention to detail.
            </li>
            <li className="text-women">3 -  Elegant and stylish clothing designed for every occasion.</li>
            <li className="text-women">4 -  Hand-embroidered and tailored to perfection, celebrating the beauty of artisanal fashion.</li>
          </ul>
        </div>
        <div className="modal-category">
        <img src={assets.Men} alt="" className="men-img" />
          <h4 className="men-title">Men</h4>
          <ul className="cat-men">
            <li className="text-men">1 - High-quality leather bags, belts, and accessories.</li>
            <li className="text-men">2 - Crafted using traditional techniques, ensuring durability and timeless style.
            </li>
            <li className="text-men">3 - Classic and contemporary clothing made with precision and care.</li>
            <li className="text-men">4 - Perfect for those who appreciate the art of fine tailoring.</li>
          </ul>
        </div>
        <div className="modal-category">
        <img src={assets.Home} alt="" className="home-img" />
          <h4 className="home-title">Home-Deco</h4>
          <ul className="cat-home">
            <li className="text-home">1 - Handwoven rugs, cushions, and throws that add warmth and character to any home.</li>
            <li className="text-home">2 - Each piece is a blend of vibrant colors and intricate patterns.
            </li>
            <li className="text-home">3 - Beautifully crafted vases, bowls, and decorative items.</li>
            <li className="text-home">4 - Perfect for adding a touch of artisanal charm to your living space.</li>
          </ul>
        </div>
        <div className="modal-category">
        <img src={assets.Beauty} alt="" className="beauty-img" />
          <h4 className="beauty-title">Beauty</h4>
          <ul className="cat-beauty">
            <li className="text-beauty">1 - Handcrafted skincare products made from natural ingredients.</li>
            <li className="text-beauty">2 - Designed to nourish and rejuvenate your skin, while being kind to the environment.
            </li>
            <li className="text-beauty">3 - Handmade candles and essential oils that promote relaxation and well-being.</li>
            <li className="text-beauty">4 - Infused with natural scents, perfect for creating a serene atmosphere.</li>
          </ul>
        </div>
        <div className="modal-category">
        <img src={assets.Gifts}alt="" className="gifts-img" />
          <h4 className="gifts-title">Gifts</h4>
          <ul className="cat-gifts">
            <li className="text-gifts">1 - Unique, handcrafted gifts for every occasion.</li>
            <li className="text-gifts">2 - Customizable options to make your gift truly special.
            </li>
            <li className="text-gifts">3 - Curated sets that showcase the best of BrimaSouk’s artisanal products.</li>
            <li className="text-gifts">4 - Perfect for holidays, birthdays, and special celebrations.</li>
          </ul>
        </div>
        <div className="our-commitment">
          
          <h4 className="commit-title">" Our Commitment "</h4>
          <ul className="cat-commit">
            <li className="text-commit">* Sustainability: We prioritize sustainable practices, using eco-friendly materials and supporting fair trade.</li>
            <li className="text-commit">* Empowerment: By purchasing from BrimaSouk, you are supporting artisans and helping to preserve their craft for future generations.
            </li>
            <li className="text-commit">* Quality: We are dedicated to providing products that are not only beautiful but also of the highest quality.</li>
            
          </ul>
        </div>
        <div className="choose-brima">
          
          <h4 className="choose-title"> " Why Choose BrimaSouk ? "</h4>
          <ul className="cat-choose">
            <li className="text-choose">* Authenticity: Each product is a genuine work of art, reflecting the cultural heritage of the artisan.</li>
            <li className="text-choose">* Exclusivity: Our handcrafted items are unique and limited in quantity, ensuring you own a piece that is truly special.
            </li>
            <li className="text-choose">* Connection: Owning a BrimaSouk product connects you to a rich tradition of craftsmanship and artistry.</li>
            
          </ul>
        </div>
        <div className="thanks">
          <h2 className="thanks-title">" Thank you for considering BrimaSouk. We look forward to sharing our passion for artisanal craftsmanship with you.! "</h2>
        </div>



       
      </div>
    </div>
  );
}

export default Modal;