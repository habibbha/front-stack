import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { assets } from '../../../assets/assets';
import { login } from '../../../actions/auth';
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import './LoginModal.css';
import swal from 'sweetalert';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const LoginModal = ({ open, handleClose, switchToRegister }) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { message } = useSelector(state => state.message) || { message: '' };
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          setLoading(false);
          handleClose();
          swal("Success", "Successfully Logged In!", "success");
        })
        .catch(() => {
          setLoading(false);
          swal("Failed", message || "Log in Failed, Check Username or Password !", "error");
        });
    } else {
      setLoading(false);
      swal("Failed", "Please fill in all required fields", "error");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modalStyle">
        <Form className="login-popup-container" onSubmit={handleLogin} ref={form}>
          <div className="login-popup-title">
            <Typography variant="h6" component="h2">
              Login
            </Typography>
            <img onClick={handleClose} src={assets.remove_icon_yellow} alt="Close" />
          </div>
          <div className="login-popup-inputs">
            <TextField
              type="text"
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={onChangeUsername}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ffc107',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffc107',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffc107',
                  },
                  backgroundColor: 'hsl(220, 47%, 96%)',
                  borderRadius: '4px',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgb(26, 86, 176)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'rgb(109, 158, 219)',
                },
                '& .MuiInputBase-input': {
                  color: 'rgb(26, 86, 176)',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgb(26, 86, 176)',
                },
              }}
              validations={[required]}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={onChangePassword}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ffc107',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffc107',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffc107',
                  },
                  backgroundColor: 'hsl(220, 47%, 96%)',
                  borderRadius: '4px',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgb(26, 86, 176)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'rgb(109, 158, 219)',
                },
                '& .MuiInputBase-input': {
                  color: '#ffc107',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgb(26, 86, 176)',
                },
              }}
              validations={[required]}
            />
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Sign in</span>
          </Button>

          <Typography className="new-account" variant="body2">
            Create a new account? <span onClick={switchToRegister} className="login-register-span">" Register "</span>
          </Typography>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Box>
    </Modal>
  );
};

export default LoginModal;