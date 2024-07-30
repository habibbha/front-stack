import React, { useContext, useState, useEffect } from "react";
import "./CategoryItem.css";
import { assets } from "../../assets/assets";
import { FaStar } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { getAllProducts } from "../../actions/product.actions";
import { getCartsByUserId, addToCarttwo, removeItemFromCart, updateItemQuantity, createNewCart } from "../../actions/carttwo.actions";
import { useDispatch, useSelector } from "react-redux";

const CategoryItem = ({ id, name, price, description, image }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { cartItems } = useContext(StoreContext);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const carts = useSelector((state) => state.carttwo.carts);
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [datacart, setDatacart] = useState([]);
  const userCarts = useSelector((state) => state.carttwo.carts);
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'));

  useEffect(() => {
    dispatch(getAllProducts());
    console.log("getAllProducts dispatched");
  }, [dispatch]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(getCartsByUserId(auth.user.id));
      console.log("getCartsByUserId dispatched");
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (carts) {
      setDatacart(carts);
      console.log("carts:", carts);
    }
  }, [carts]);

  useEffect(() => {
    if (products) {
      setData(products);
      console.log("Products:", products);
    }
  }, [products]);

  useEffect(() => {
    if (userCarts) {
      console.log("User Carts:", userCarts);
    }
  }, [userCarts]);

  useEffect(() => {
    if (!cartId) {
      dispatch(createNewCart());
    }
  }, [dispatch, cartId]);

  useEffect(() => {
    setCartId(localStorage.getItem('cartId'));
  }, [localStorage.getItem('cartId')]);

  const handleAddToCart = (productId) => {
    let currentCartId = localStorage.getItem('cartId');
    if (!currentCartId) {
      dispatch(createNewCart());
      currentCartId = localStorage.getItem('cartId');
    }
    dispatch(addToCarttwo(currentCartId, productId, 1, auth.user.id));
  };

  const handleRemoveFromCart = (productId) => {
    const currentCartId = localStorage.getItem('cartId');
    if (cartItems[productId] > 1) {
      dispatch(updateItemQuantity(currentCartId, productId, cartItems[productId] - 1));
    } else {
      dispatch(removeItemFromCart(currentCartId, productId));
    }
  };

  return (
    <div className="category-item" id="category-item">
      <div className="category-item-img-container">
        <img
          src={image}
          alt="image not found"
          className="category-item-image"
        />
        
      </div>
      
      <div
      
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                style={{ display: "none" }}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                size={16}
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                style={{
                  cursor: "pointer",
                  transition: "color 200ms",
                  marginRight: "5px",
                }}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
        <p className="rate"> {rating} / 5 </p>
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => handleAddToCart(id)}
            src={assets.add_basket_icon}
            alt="image not found"
          />
        ) : (
          <div className="category-item-counter">
            <img
              className="minus"
              onClick={() => handleRemoveFromCart(id)}
              src={assets.remove_icon_yellow}
              alt="image not found"
            />
            <p>{cartItems[id]}</p>
            <img
              className="plus"
              onClick={() => handleAddToCart(id)}
              src={assets.add_icon_blue}
              alt="image not found"
            />
          </div>
        )}
      </div>
      

      <div className="category-item-info">
        <div className="category-item-name">
          <p>{name}</p>
        </div>
        <p className="category-item-description">{description}</p>
        <p className="category-item-price">{price} DT</p>
      </div>
    </div>
  );
};

export default CategoryItem;
