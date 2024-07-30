import React, { useState } from 'react';
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreCat from "../../components/ExploreCat/ExploreCat";
import NewCollection from '../NewCollection/NewCollection';
import Discounts from '../Discounts/Discounts';
import BestSellers from '../BestSellers/BestSellers';
import CategoryDisplay from "../../components/CategoryDisplay/CategoryDisplay";
import Download from '../../components/Download/Download';
import Navbar from '../../components/Navbar/Navbar'; 

const Hometwo = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedCategory('All'); 
  };

  return (
    <div className="container" id="homelink">
      <Navbar onSearch={handleSearch} /> 
      <Header />
      <ExploreCat category={selectedCategory} setCategory={setSelectedCategory} />
      <CategoryDisplay category={selectedCategory} searchTerm={searchTerm} />
      <NewCollection />
      <BestSellers />
      <Discounts />
      <Download />
    </div>
  );
};

export default Hometwo;