import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, CardActionArea, Button, Dialog, DialogTitle, DialogContent, DialogActions, Collapse, Slider, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import Footer from './Footer';
import Confetti from 'react-confetti';

const CatalogPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const { addToCart } = useCart();
  const { addToFavorites, favoriteItems } = useFavorites();
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([3000000, 100000000]);
  const [engineType, setEngineType] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [ecoClass, setEcoClass] = useState('');
  const [equipmentLevel, setEquipmentLevel] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/cars')
      .then(response => response.json())
      .then(data => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  useEffect(() => {
    filterCars();
  }, [priceRange, engineType, bodyType, ecoClass, equipmentLevel]);

  const filterCars = () => {
    let filtered = cars;

    filtered = filtered.filter(car => {
      const carPrice = parseFloat(car.price.replace(/\s+/g, ''));
      return carPrice >= priceRange[0] && carPrice <= priceRange[1];
    });

    if (engineType) {
      filtered = filtered.filter(car => car.Fuel === engineType);
    }

    if (bodyType) {
      filtered = filtered.filter(car => car.The_body === bodyType);
    }

    if (ecoClass) {
      filtered = filtered.filter(car => car.Environmental_class === ecoClass);
    }

    if (equipmentLevel) {
      filtered = filtered.filter(car => car.Equipment === equipmentLevel);
    }

    setFilteredCars(filtered);
  };

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

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Container maxWidth={false} disableGutters>
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <Container sx={{ padding: '20px' }}>
        <Typography variant="h4" component="h2" gutterBottom align='center'>
          Каталог автомобилей
        </Typography>
        <Button variant="contained" onClick={toggleFilter} sx={{ marginBottom: 2, backgroundColor: '#4E5452'}}>
          {filterOpen ? 'Скрыть фильтр' : 'Показать фильтр'}
        </Button>
        <Collapse in={filterOpen}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, marginBottom: 2 }}>
            <Typography variant="h6">Фильтры</Typography>
            <Box sx={{ marginY: 2 }}>
              <Typography gutterBottom>Цена</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={3000000}
                max={100000000}
                step={1000000}
              />
            </Box>
            <FormControl fullWidth sx={{ marginY: 2 }}>
              <InputLabel>Двигатель</InputLabel>
              <Select
                value={engineType}
                onChange={(e) => setEngineType(e.target.value)}
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="Бензин">Бензин</MenuItem>
                <MenuItem value="Дизель">Дизель</MenuItem>
                <MenuItem value="Электро">Электро</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginY: 2 }}>
              <InputLabel>Кузов</InputLabel>
              <Select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="Седан">Седан</MenuItem>
                <MenuItem value="Купе">Купе</MenuItem>
                <MenuItem value="Кабриолет">Кабриолет</MenuItem>
                <MenuItem value="Внедорожник">Внедорожник</MenuItem>
                <MenuItem value="Кроссовер">Кроссовер</MenuItem>
                <MenuItem value="Универсал">Универсал</MenuItem>
                <MenuItem value="Гран Купе">Гран Купе</MenuItem>
                <MenuItem value="Хэтчбек">Хэтчбек</MenuItem>
                <MenuItem value="Гран Туризмо">Гран Туризмо</MenuItem>
                <MenuItem value="Минивэн">Минивэн</MenuItem>
                <MenuItem value="Роадстер">Роадстер</MenuItem>
                <MenuItem value="Спорткупе">Спорткупе</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginY: 2 }}>
              <InputLabel>Экологический класс</InputLabel>
              <Select
                value={ecoClass}
                onChange={(e) => setEcoClass(e.target.value)}
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="Евро-4">Евро-4</MenuItem>
                <MenuItem value="Евро-5">Евро-5</MenuItem>
                <MenuItem value="Евро-6">Евро-6</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginY: 2 }}>
              <InputLabel>Комплектация</InputLabel>
              <Select
                value={equipmentLevel}
                onChange={(e) => setEquipmentLevel(e.target.value)}
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="Базовая">Базовая</MenuItem>
                <MenuItem value="Средняя">Средняя</MenuItem>
                <MenuItem value="Премиум">Премиум</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Collapse>
        {filteredCars.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ marginTop: 10 }}>
            По вашему запросу ничего не найдено
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {filteredCars.map((car) => (
              <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card onClick={() => handleClickOpen(car)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={car.images}
                        alt={car.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {car.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Топливо: {car.Fuel}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Стоимость: от {car.price} ₽
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />

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
    </Container>
  );
};

export default CatalogPage;
