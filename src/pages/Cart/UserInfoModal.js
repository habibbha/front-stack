import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { updateCartWithUserInfo, clearCart, createNewCart } from '../../actions/carttwo.actions';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh', // Set a maximum height for the modal
  bgcolor: '#f1f1f1',
  borderRadius: '30px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backgroundColor: "hsl(220, 47%, 96%)",
  p: 4,
  color: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.2)'
};

const contentStyle = {
  overflowY: 'auto', // Add vertical scroll
  width: '100%',
  maxHeight: '70vh', // Set a maximum height for the content
  display: 'flex',
  flexDirection: 'column',
  gap: 2,// Add gap between elements
  // backgroundCcolor:"hsl(220, 47%, 96%)",
};
 

function UserInfoModal({ open, onClose, userInfo, setUserInfo, cartItems, cartId }) {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting user info:", userInfo);
    console.log("Using cartId:", cartId);
    await dispatch(updateCartWithUserInfo(cartId, userInfo));
    console.log("Cart updated with user info");

    // Clear the cart and create a new one
    dispatch(clearCart());
    const newCartId = dispatch(createNewCart());
    localStorage.setItem('cartId', newCartId);
    console.log("New cart created with ID:", newCartId);

    onClose();
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-info-modal-title"
      aria-describedby="user-info-modal-description"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ ...modalStyle }}>
        <Typography style={{color:"rgb(26, 86, 176)"}} id="user-info-modal-title" variant="h6" component="h2">
          * Confirmation *
        </Typography>
        <Box sx={contentStyle}>
          <List sx={{ width: '100%',color:"rgb(26, 86, 176)" }}>
            {cartItems?.map((item) => (
              <ListItem key={item._id}>
                <ListItemText primary={`${item.product.name} x ${item.quantity}`} />
              </ListItem>
            ))}
          </List>
          <TextField label="First Name" variant="outlined" name="firstName" value={userInfo.firstName} onChange={handleUserInfoChange} fullWidth />
          <TextField label="Last Name" variant="outlined" name="lastName" value={userInfo.lastName} onChange={handleUserInfoChange} fullWidth />
          <TextField label="Email" variant="outlined" name="email" value={userInfo.email} onChange={handleUserInfoChange} fullWidth />
          <TextField label="Address" variant="outlined" name="address" value={userInfo.address} onChange={handleUserInfoChange} fullWidth />
          <TextField label="City" variant="outlined" name="city" value={userInfo.city} onChange={handleUserInfoChange} fullWidth />
          <TextField label="Country" variant="outlined" name="country" value={userInfo.country} onChange={handleUserInfoChange} fullWidth />
          <TextField label="Postal Code" variant="outlined" name="postalCode" value={userInfo.postalCode} onChange={handleUserInfoChange} fullWidth />
          <TextField label="Phone Number" variant="outlined" name="phoneNumber" value={userInfo.phoneNumber} onChange={handleUserInfoChange} fullWidth />
          <TextField label="Message" variant="outlined" name="message" multiline rows={3} value={userInfo.message} onChange={handleUserInfoChange} fullWidth />
        </Box>
        <Button type="submit" variant="contained" sx={{
            mt: 2, backgroundColor: '#rgb(26, 86, 176)', color: '#ffffff',
            fontSize: '14px', borderRadius: '8px',
            '&:hover': { backgroundColor: '#ffc107', color: '#ffffff' }
          }}>Proceed to Payment !</Button>
      </Box>
    </Modal>
  );
}

export default UserInfoModal;
