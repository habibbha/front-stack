import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Box, Typography, Button, Badge, List, ListItem, ListItemText, IconButton, Avatar } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getCarttwo, updateItemQuantity, removeItemFromCart, createNewCart, clearCart } from '../../actions/carttwo.actions';
import { getAllProducts } from '../../actions/product.actions';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UserInfoModal from './UserInfoModal';
import { assets } from '../../assets/assets';

const MySwal = withReactContent(Swal);

const CartModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [itemQuantities, setItemQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [productMapping, setProductMapping] = useState({});
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
    message: ''
  });
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'));
  const dispatch = useDispatch();
  const carttwo = useSelector(state => state.carttwo.carttwo || { items: [] });
  const products = useSelector(state => state.product.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      setCartId(storedCartId);
      dispatch(getCarttwo(storedCartId));
    } else {
      dispatch(createNewCart()).then(action => {
        const newCartId = action.payload._id;
        localStorage.setItem('cartId', newCartId);
        setCartId(newCartId);
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (carttwo && carttwo.items) {
      const updatedQuantities = {};
      carttwo.items.forEach(item => {
        updatedQuantities[item._id] = item.quantity;
      });

      const newTotalPrice = calculateTotalPrice(carttwo.items);
      setItemQuantities(updatedQuantities);
      setTotalPrice(newTotalPrice);
    }
  }, [carttwo.items]);

  useEffect(() => {
    if (products.length) {
      const mapping = {};
      products.forEach(product => {
        mapping[product._id] = product;
      });
      setProductMapping(mapping);
    }
  }, [products]);

  const handleOpenModal = () => {
    dispatch(getCarttwo(cartId));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenUserInfoModal = () => {
    setUserInfoModalOpen(true);
    setModalOpen(false);
  };

  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen(false);
  };

  const handleIncreaseQuantity = (itemId) => {
    const newQuantity = (itemQuantities[itemId] || 0) + 1;
    setItemQuantities({ ...itemQuantities, [itemId]: newQuantity });
    dispatch(updateItemQuantity(cartId, itemId, newQuantity));
    updateTotalPrice();
  };

  const handleDecreaseQuantity = (itemId) => {
    if (itemQuantities[itemId] > 1) {
      const newQuantity = itemQuantities[itemId] - 1;
      setItemQuantities({ ...itemQuantities, [itemId]: newQuantity });
      dispatch(updateItemQuantity(cartId, itemId, newQuantity));
    } else {
      const newItems = { ...itemQuantities };
      delete newItems[itemId];
      setItemQuantities(newItems);
      dispatch(removeItemFromCart(carttwo._id, itemId));
    }
    updateTotalPrice();
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(carttwo._id, itemId));
    setItemQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[itemId];
      return newQuantities;
    });
    updateTotalPrice();
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/,/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const updateTotalPrice = () => {
    const items = carttwo.items.map(item => ({
      ...item,
      quantity: itemQuantities[item._id] || item.quantity
    }));
    setTotalPrice(calculateTotalPrice(items));
  };

  const modalStyle = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 900,  bgcolor: 'hsl(220, 47%, 96%)', borderRadius: '30px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    p: 4, color: 'rgb(26, 86, 176)', fontFamily: 'cursive', display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 2, overflow: 'hidden', border: '1px  rgba(255, 255, 255, 0.2)'
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: 'rgb(26, 86, 176)',
      color: '#ffc107',
      width: '5px',
      height: '20px',
      fontSize: '0.8rem',
      transform: 'translateY(-60%)',
      right: '-20px',
      cursor :"pointer",
    },
  }));

  return (
    <>
      <div className="cart-icon-fixed" onClick={handleOpenModal}>
        <StyledBadge badgeContent={carttwo ? carttwo.items.length : 0}>
        
          <img src={assets.basket_icon} alt="image not found" className="basket-icon" style={{width:"32px", cursor:"pointer"}}/>
        </StyledBadge>
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="cart-modal-title" aria-describedby="cart-modal-description">
        <Box sx={modalStyle}>
          <Typography id="cart-modal-title" variant="h6" component="h2" className="goldenCursiveText" style={{ color: "rgb(26, 86, 176)" }}>
            * Cart Items *
          </Typography>
          <List sx={{ width: '100%', maxHeight: 200, overflow: 'auto', color: 'rgb(26, 86, 176)' }}>
            {carttwo.items && carttwo.items.map((item) => {
              const quantity = itemQuantities[item._id] || item.quantity;
              const price = parseFloat(item.price.replace(/,/g, ''));
              const totalPrice = price * quantity;
              const product = productMapping[item.product] || {};
              const productName = product.name || 'Nom indisponible';
              const productImage = product.files?.[0]?.url || '';
              return (
                <ListItem key={item._id} alignItems="flex-start">
                  <Avatar alt={productName} src={productImage} sx={{ width: 50, height: 50, marginRight: 2 }} />
                  <ListItemText
                    primary={`${productName} x ${quantity}`}
                    secondary={ `Price: ${totalPrice.toFixed(0)}`}
                  />
                   <img  style={{width :"43px" , padding:"9px",cursor:"pointer" }} src={assets.remove_icon_yellow} onClick={() => handleDecreaseQuantity(item._id)}/>
                  
                  <img style={{width :"43px", padding:"9px",cursor:"pointer" }} src={assets.add_icon_blue} onClick={() => handleIncreaseQuantity(item._id)}/>
                  <img style={{width :"43px", padding:"9px",cursor:"pointer" }} src={assets.delete_icon} onClick={() => handleRemoveItem(item._id)}/>
                  
                </ListItem>
              );
            })}
          </List>
          <Box sx={{ width: '60%', borderBottom: '1px solid rgb(26, 86, 176)' }} />
          <Typography variant="h6" component="h2" style={{ color: 'rgb(26, 86, 176)', marginTop: '16px',fontSize:"20px" }}>
            Total-Price:  <b>{totalPrice.toFixed(0)}</b> <span style={{color:"#ffc107"}}>DT</span>
          </Typography>
          <Button onClick={handleOpenUserInfoModal} variant="contained" sx={{
            mt: 2, backgroundColor: '#rgb(26, 86, 176)', color: '#ffffff',
            fontSize: '14px', borderRadius: '8px',
            '&:hover': { backgroundColor: '#ffc107', color: '#ffffff' }
          }}>
            Proceed to Checkout !
          </Button>
        </Box>
      </Modal>
      <UserInfoModal
        open={userInfoModalOpen}
        onClose={handleCloseUserInfoModal}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        cartItems={carttwo.items}
        cartId={cartId}
      />
    </>
  );
};

export default CartModal;
