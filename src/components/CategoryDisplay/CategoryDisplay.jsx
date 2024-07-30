import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../actions/product.actions';
import CategoryItem from '../CategoryItem/CategoryItem';
import "./CategoryDisplay.css";


const CategoryDisplay = ({ category }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="category-display" id="category-display">
      <h2> * BrimaSouk ! *</h2>
      <div className="category-display-list" id="category-display-list">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {products && products.map((item) => {
          if (category === "All" || category === item.categorie) {
            return (
              <CategoryItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.files.length > 0 ? item.files[0].url : ''}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default CategoryDisplay;
