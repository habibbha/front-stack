import React from 'react';
import './ExploreCat.css';
import { assets } from '../../assets/assets';


const category_list = [
  { category_name: "Women", category_img: assets.Women },
  { category_name: "Men", category_img: assets.Men },
  { category_name: "Kids", category_img: assets.Kids },
  { category_name: "Home", category_img: assets.Home },
  { category_name: "Beauty", category_img: assets.Beauty },
  { category_name: "Gifts", category_img: assets.Gifts },
];


const ExploreCat = ({ category, setCategory }) => {


  return (
    <>
      <div className="explore-cat" id="categories">
        <h1>* Explore Categories .! *</h1>
        <p className="explore-cat-text">
          * Conduct a targeted search across various categories to identify and purchase the items you need.!
        </p>
        
        <a href="#all-categories" onClick={() => setCategory("All")}>
          <div className="all-souk">
          <p className="souk-name">* BrimaSouk *</p>
            <img src={assets.souk} alt="" className="souk-img" />
            
            
          </div>
        </a>

        <div className="explore-cat-list">
          {category_list.map((item, index) => (
            <a href={`#${item.category_name}`} key={index}>
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.category_name ? 'All' : item.category_name
                  )
                }
                className="explore-cat-list-item"
              >
                <img src={item.category_img} alt="image not found" />
                <p className={category === item.category_name ? 'active' : ''}>
                  {item.category_name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div id="all-categories">
        {/* Render all categories here */}
      </div>

      {category_list.map((item, index) => (
        <div id={item.category_name} key={index}>
          {/* Render each category here */}
        </div>
      ))}
    </>
  );
};

export default ExploreCat;

