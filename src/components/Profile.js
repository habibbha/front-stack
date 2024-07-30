import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCartsByUserId } from '../actions/carttwo.actions';
import { Modal, Box, Typography } from '@mui/material';
import './Profile.css';

const Profile = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const carts = useSelector((state) => state.carttwo.carts);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(getCartsByUserId(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modalStyle2">
        <div className="container2">
          <Typography variant="h6" component="h2" className="modalTitle2">
            <b>My Orders</b>
          </Typography>
          <div  className="cart-table2">
            <div className="cart-table-header2">
              <div style={{color:"rgb(26, 86, 176)",fontSize:"14px"}}>Cart ID</div>
              <div style={{color:"rgb(26, 86, 176)",fontSize:"14px"}}>Email</div>
              <div style={{color:"rgb(26, 86, 176)",fontSize:"14px"}}>Phone Number</div>
              <div style={{color:"rgb(26, 86, 176)",fontSize:"14px"}}>Total Amount</div>
            </div>
            {carts.map(cart => (
              <div  key={cart._id} className="cart-table-row2">
               
                <div>{cart.cartId}</div>
                <div>{cart.userInfo?.email || 'Unknown'}</div>
                <div>{cart.userInfo?.phoneNumber || 'Unknown'}</div>
                <div>{cart.total}</div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Profile;
