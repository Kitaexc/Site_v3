import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Paper, MenuItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import { Search as SearchIcon, Favorite as FavoriteIcon, Person as PersonIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import logo from '../assets/Header/logo.png';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const { addToCart } = useCart();
  const { addToFavorites, favoriteItems } = useFavorites();
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = cars.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, cars]);

  const handleClickOpen = (car) => {
    setSelectedCar(car);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCar(null);
  };

  const handleAddToCart = (car) => {
    addToCart(car);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const handleAddToFavorites = (car) => {
    if (!favoriteItems.some(item => item.id === car.id)) {
      addToFavorites(car);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    } else {
      alert("Этот автомобиль уже добавлен в избранное.");
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4E5452' }}>
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={logo} alt="Logo" style={{ height: 30, marginTop: 7 }} />
            </Link>
          </Typography>
          <Typography variant="button" component="div" style={{ marginLeft: 20 }}>
            <Link to="/catalog" style={{ textDecoration: 'none', color: 'inherit' }}>Каталог</Link>
          </Typography>
          {(location.pathname === '/' || location.pathname === '/catalog') && (
            <Box display="flex" alignItems="center" position="relative" style={{ marginLeft: 20, flexGrow: 1 }}>
              <InputBase
                placeholder="Поиск…"
                inputProps={{ 'aria-label': 'search' }}
                startAdornment={<SearchIcon style={{ marginRight: 10 }} />}
                style={{
                  padding: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  backgroundColor: 'white',
                  borderRadius: 4,
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && searchResults.length > 0 && (
                <Paper style={{
                  position: 'absolute',
                  top: '40px',
                  left: 0,
                  right: 0,
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 1000
                }}>
                  {searchResults.map((car) => (
                    <MenuItem key={car.id} onClick={() => handleClickOpen(car)}>
                      <img src={car.images} alt={car.name} style={{ height: 50, marginRight: 10 }} />
                      <ListItemText primary={car.name} secondary={`${car.price} ₽`} />
                    </MenuItem>
                  ))}
                </Paper>
              )}
            </Box>
          )}
        </Box>
        <IconButton color="inherit" component={Link} to="/favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/profile">
          <PersonIcon />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/cart">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>

      {selectedCar && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>{selectedCar.name}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Carousel showThumbs={false}>
                  {selectedCar.imagesIn.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`${selectedCar.name} ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                    </div>
                  ))}
                </Carousel>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h6" gutterBottom>
                  Описание
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {selectedCar.Aboutcar}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Характеристики
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Топливо: {selectedCar.Fuel}<br />
                  {selectedCar.Engine}<br />
                  {selectedCar.Power}<br />
                  {selectedCar.Overclocking}<br />
                  {selectedCar.Maximum_speed}<br />
                  {selectedCar.The_torque}<br />
                  {selectedCar.Drive}<br />
                  {selectedCar.Transmission}<br />
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Стоимость: {selectedCar.price} ₽
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Закрыть
            </Button>
            <motion.div
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => {
                handleAddToCart(selectedCar);
                handleClose();
              }}
            >
              <Button variant="contained" color="primary">
                В корзину
              </Button>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => {
                handleAddToFavorites(selectedCar);
                handleClose();
              }}
            >
              <Button variant="contained" color="secondary">
                В избранное
              </Button>
            </motion.div>
          </DialogActions>
        </Dialog>
      )}
    </AppBar>
  );
};

export default Header;
