import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import LoginModal from './Login/LoginModal';
import RegisterModal from './Register/RegisterModal';
import { logout } from '../../actions/auth';
import { getAllProducts } from '../../actions/product.actions';
import { FaUser } from 'react-icons/fa';
import CartModal from '../../pages/Cart/Cart';
import Profile from '../Profile';
import { IconButton, InputBase, Box, Paper, List, ListItem, ListItemText, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Navbar = ({ onSearch }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleOpen = () => {
    setProfileOpen(true);
  };

  const handleClose = () => {
    setProfileOpen(false);
  };

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Filtrer les produits pour obtenir les suggestions
    if (value.length > 0) {
      const filteredSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion.name);
    setSuggestions([]);
  };

  const handleSearchSubmit = () => {
    onSearch(searchValue); // Apl la fonction onSearch passée en prop
    setSuggestions([]);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSuggestions([]);
    onSearch(''); // Réinitialiser la recherche
  };

  const [dropdown, setDropdown] = useState(false);
  const [list, setList] = useState('Home');
  const { getTotalCartAmount } = useContext(StoreContext);

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { products } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  // const openCartModal = () => {
  //   setCartModalOpen(true);
  // };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const switchToRegisterModal = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const switchToLoginModal = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const scrollToSection = (sectionId, listName) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      setList(listName);
    }
  };

  const scrollToNewCollection = () => {
    const newCollectionElement = document.getElementById("newCollection");
    if (newCollectionElement) {
      newCollectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBestSellers = () => {
    const bestSellersElement = document.getElementById("bestSellers");
    if (bestSellersElement) {
      bestSellersElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDiscounts = () => {
    const discountsElement = document.getElementById("discounts");
    if (discountsElement) {
      discountsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="navbar">
      <Link className="link-to" to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-list">
        <Link to="/">
          <li
            onClick={() => scrollToSection('hero', 'Home')}
            className={list === 'Home' ? 'active' : ''}
          >
            Home
          </li>
        </Link>
        <li
          className={list === 'Categories' ? 'active' : ''}
          onMouseEnter={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
        >
          Categories
          {dropdown && (
            <ul className="categories-menu">
              <li onClick={() => scrollToSection('categories', 'Categories')}>Category List</li>
              <li onClick={scrollToNewCollection}>New Collection</li>
              <li onClick={scrollToBestSellers}>Best Sellers</li>
              <li onClick={scrollToDiscounts}>Discounts</li>
            </ul>
          )}
        </li>
        <li
          onClick={() => scrollToSection('download', 'Download')}
          className={list === 'Download' ? 'active' : ''}
        >
          Download
        </li>
        <li
          onClick={() => scrollToSection('contact', 'Contact')}
          className={list === 'Contact' ? 'active' : ''}
        >
          Contact
        </li>
      </ul>
      <div className="navbar-right">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleSearchClick} sx={{ color: 'primary.main' }}>
            <SearchIcon />
          </IconButton>
          {showSearchInput && (
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <InputBase
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                placeholder="Search…"
                sx={{
                  ml: 1,
                  flex: 1,
                  bgcolor: 'background.paper',
                  p: 1,
                  borderRadius: 1,
                  boxShadow: 1,
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton onClick={handleSearchSubmit}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {suggestions.length > 0 && (
                <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10 }}>
                  <List>
                    {suggestions.map((suggestion) => (
                      <ListItem button key={suggestion._id} onClick={() => handleSuggestionClick(suggestion)}>
                        <ListItemText primary={suggestion.name} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>
          )}
        </Box>
        <div className="navbar-search-icon">
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {isLoggedIn ? (
          <>
            <FaUser onClick={handleOpen} className="user-icon" />
            <button onClick={handleLogout} className="login">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={openLoginModal} className="login">
              Login
            </button>
            <button onClick={openRegisterModal} className="register">
              Register
            </button>
          </>
        )}
      </div>
      <LoginModal open={loginModalOpen} handleClose={closeLoginModal} switchToRegister={switchToRegisterModal} />
      <RegisterModal open={registerModalOpen} handleClose={closeRegisterModal} switchToLogin={switchToLoginModal} />
      <CartModal open={cartModalOpen} handleClose={closeCartModal} />
      <Profile open={profileOpen} handleClose={handleClose} />
    </div>
  );
};

export default Navbar;