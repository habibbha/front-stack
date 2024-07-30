import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../actions/product.actions';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
import "./BestSellers.css";


const NewCollection = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);
  const [newCollectionProducts, setNewCollectionProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter(product => product.type === 'Best_Seller');
      setNewCollectionProducts(filteredProducts);
    }
  }, [products]);

  return (
    <div className="category-display" id="new-collection-display">
      <h1 className="titre-h1" id="bestSellers"> * Best Sellers ! *</h1>
      <div className="category-display-list" id="category-display-list">
      {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {newCollectionProducts && newCollectionProducts.map((item) => (
          <CategoryItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.files.length > 0 ? item.files[0].url : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollection;