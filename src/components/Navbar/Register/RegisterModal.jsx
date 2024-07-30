import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { assets } from '../../../assets/assets';
import { register } from '../../../actions/auth';
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import './RegisterModal.css';
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const RegisterModal = ({ open, handleClose, switchToLogin }) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const { message } = useSelector(state => state.message) || { message: '' };
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
          setLoading(false);
          handleClose();
          switchToLogin();
          swal("Success", "Successfully Registered!", "success");
        })
        .catch((error) => {
          setSuccessful(false);
          setLoading(false);
          swal("Failed", error?.message || "Failed to Register, Email or Username already in Use !", "error");
        });
    } else {
      setLoading(false);
      swal("Failed", "Please fill in all required fields", "error");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modalStyle">
        <Form className="register-popup-container" onSubmit={handleRegister} ref={form}>
          <div className="register-popup-title">
            <Typography variant="h6" component="h2">
              Register
            </Typography>
            <img onClick={handleClose} src={assets.remove_icon_yellow} alt="Close" />
          </div>
          <div className="register-popup-inputs">
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
              validations={[required, vusername]}
            />
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={onChangeEmail}
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
              validations={[required, validEmail]}
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
              validations={[required, vpassword]}
            />
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
           <span>Sign up</span>
          </Button>

          <Typography className="go-login" variant="body2">
            Already have an account? <span onClick={switchToLogin} className="login-register-span"> " Login "</span>
          </Typography>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;