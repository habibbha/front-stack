import React, { useEffect, useState } from 'react';
import "./PlaceOrder.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCartsByUserId, updateCartWithUserInfo, createNewCart, clearCart } from '../../actions/carttwo.actions';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.carttwo.carttwo); // Assuming the user has only one cart
  const cartItems = cart?.items || [];
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNumber: ''
  });

  const [cartId, setCartId] = useState(localStorage.getItem('cartId'));
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(getCartsByUserId(auth.user.id));
    }
  }, [dispatch, auth.isLoggedIn, auth.user.id]);

  useEffect(() => {
    if (!cartId) {
      dispatch(createNewCart());
    }
  }, [dispatch, cartId]);

  useEffect(() => {
    setCartId(localStorage.getItem('cartId'));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    console.log("handlePlaceOrder called");
    console.log("UserInfo:", userInfo);
    console.log("CartId:", cartId);
    console.log("Auth user ID:", auth.user?.id);
    console.log("Cart:", cart);

    if (cart && auth.user?.id) {
      console.log("Dispatching updateCartWithUserInfo");
      await dispatch(updateCartWithUserInfo(cartId, userInfo));
      console.log("Dispatching clearCart");
      dispatch(clearCart());
      console.log("Dispatching createNewCart");
      await dispatch(createNewCart());
      setCartId(localStorage.getItem('cartId'));
      console.log("Navigating to confirmation");
      navigate('/confirmation');
    } else {
      console.log("Cart or user ID missing");
    }
  };

  return (
    <div>
      <form className="place-order" onSubmit={handlePlaceOrder}>
        <div className="place-order-left">
          <p className="title">Shipping Information</p>
          <div className="multi-fields">
            <input type="text" name="firstName" placeholder='First Name' onChange={handleInputChange} />
            <input type="text" name="lastName" placeholder='Last Name' onChange={handleInputChange} />
          </div>
          <input type="email" name="email" placeholder='Email' onChange={handleInputChange} />
          <input type="text" name="address" placeholder='Address' onChange={handleInputChange} />
          <div className="multi-fields">
            <input type="text" name="city" placeholder='City' onChange={handleInputChange} />
            <input type="text" name="country" placeholder='Country' onChange={handleInputChange} />
          </div>
          <div className="multi-fields">
            <input type="text" name="postalCode" placeholder='Postal Code' onChange={handleInputChange} />
          </div>
          <input type="text" name="phoneNumber" placeholder='Phone' onChange={handleInputChange} />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2> Cart Totals </h2>
            <div>
              <div className="total-price-details2">
                <p>Sub-total</p>
                <p className="prix">{totalPrice} DT</p>
              </div>
              <hr id='ligne' />
              <div className="total-price-details2">
                <p>Shipping</p>
                <p className="prix">{8} DT</p>
              </div>
              <hr id='ligne' />
              <div className="total-price-details2">
                <b>Total To Pay</b>
                <p className="prix3">{totalPrice + 8} DT</p>
              </div>
            </div>
            <button type="submit">Proceed To Purchase!</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
