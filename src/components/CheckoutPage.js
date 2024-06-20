import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box, FormControl, MenuItem, Select, FormHelperText } from '@mui/material';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import Footer from './Footer';
import emailjs from 'emailjs-com';
import { useCart } from '../contexts/CartContext';
import ReCAPTCHA from 'react-google-recaptcha';

const CheckoutPage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [coordinates, setCoordinates] = useState([55.751574, 37.573856]); 
  const [address, setAddress] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [placemarks, setPlacemarks] = useState([
    { id: 1, coords: [59.929308, 29.691717], title: "Санкт-Петербург, Краснофлотское шоссе, 49А" },
    { id: 2, coords: [60.006226, 29.711025], title: "Санкт-Петербург, Кронштадт, остров Котлин" },
    { id: 3, coords: [59.883397, 30.202117], title: "Санкт-Петербург, дорога на Турухтанные Острова, 30, стр. 2" },
    { id: 4, coords: [55.769595, 37.873493], title: "Москва, Можайское ш., 165, стр. 15, рабочий посёлок Новоивановское" },
    { id: 5, coords: [55.711225, 37.383707], title: "Москва, ул. Подольских Курсантов, 22" },
    { id: 6, coords: [55.597236, 37.629888], title: "Фабричная улица, 5, Реутов, Московская область" }
  ]);

  const { cartItems } = useCart();

  const onSubmit = (data) => {
    if (!captchaVerified) {
      alert('Пожалуйста, подтвердите, что вы не робот.');
      return;
    }

    const carNames = cartItems.map(item => item.name).join(', ');
    const totalPrice = cartItems.reduce((acc, item) => acc + (parseFloat(item.price.replace(/\s+/g, '')) * item.quantity || 0), 0);
    const totalDiscount = cartItems.reduce((acc, item) => acc + (parseFloat(item.discount.replace(/\s+/g, '')) * item.quantity || 0), 0);

    console.log(data);

    // Отправка письма через EmailJS
    emailjs.send('service_qcgdf28', 'template_jz6kqrl', {
      user_email: data.email,
      fullName: data.fullName,
      car_name: carNames,
      total_price: totalPrice.toLocaleString(),
      total_discount: totalDiscount.toLocaleString(),
      address: data.address,
      paymentMethod: data.paymentMethod === 'card' || 'cash' || 'loan' ? 'https://your-payment-link.com' : ''
    }, 'M_8smC3lPV5M7OOsp')
    .then((result) => {
      console.log(result.text);
      alert('Заказ оформлен!');
    }, (error) => {
      console.log(error.text);
      alert('Ошибка при отправке письма!');
    });
  };

  const handleMapClick = async (e) => {
    if (!window.ymaps) {
      alert("Yandex Maps API is not loaded");
      return;
    }

    const coords = e.get('coords');
    setCoordinates(coords);

    try {
      const geocoder = await window.ymaps.geocode(coords);
      const firstGeoObject = geocoder.geoObjects.get(0);
      const foundAddress = firstGeoObject.getAddressLine();
      setAddress(foundAddress);
      setValue('address', foundAddress);

      const newPlacemark = { id: Date.now(), coords: coords, title: foundAddress };
      setPlacemarks([...placemarks, newPlacemark]);
    } catch (error) {
      console.error('Ошибка при получении адреса:', error);
    }
  };

  const handlePlacemarkClick = (title) => {
    setAddress(title);
    setValue('address', title);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  return (
    <>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Оформление заказа
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="ФИО"
            fullWidth
            margin="normal"
            {...register('fullName', { required: true })}
            error={!!errors.fullName}
            helperText={errors.fullName && 'Поле обязательно для заполнения'}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
            error={!!errors.email}
            helperText={errors.email ? (errors.email.type === 'pattern' ? 'Неверный формат email' : 'Поле обязательно для заполнения') : ''}
          />
          <TextField
            label="Номер телефона"
            fullWidth
            margin="normal"
            {...register('phone', { required: true, pattern: /^[0-9+()-\s]*$/ })}
            error={!!errors.phone}
            helperText={errors.phone ? (errors.phone.type === 'pattern' ? 'Неверный формат номера' : 'Поле обязательно для заполнения') : ''}
          />
          <TextField
            label="Адрес"
            fullWidth
            margin="normal"
            value={address}
            InputProps={{
              readOnly: true,
            }}
            {...register('address', { required: true })}
            error={!!errors.address}
            helperText={errors.address && 'Поле обязательно для заполнения'}
          />
          <YMaps query={{ apikey: '4d33c6ea-b866-4874-84d7-1eaf058036e8' }}>
            <Map
              defaultState={{ center: [57.982526, 33.466130], zoom: 5 }}
              width="100%"
              height="400px"
              onClick={handleMapClick}
            >
              {placemarks.map(placemark => (
                <Placemark
                  key={placemark.id}
                  geometry={placemark.coords}
                  properties={{ balloonContent: placemark.title }}
                  onClick={() => handlePlacemarkClick(placemark.title)}
                />
              ))}
            </Map>
          </YMaps>
          <FormControl component="fieldset" margin="normal" fullWidth>
            <Typography component="legend">Способ оплаты</Typography>
            <Select
              fullWidth
              {...register('paymentMethod', { required: true })}
              error={!!errors.paymentMethod}
              defaultValue=""
            >
              <MenuItem value="cash">Наличными</MenuItem>
              <MenuItem value="card">Картой</MenuItem>
              <MenuItem value="loan">Автокредит</MenuItem>
            </Select>
            {errors.paymentMethod && (
              <FormHelperText error>Выберите способ оплаты</FormHelperText>
            )}
          </FormControl>
          <ReCAPTCHA
            sitekey="6Lfzu_wpAAAAAHR91arXz8h33ICe-exXQ67lNydK"
            onChange={handleCaptchaChange}
            sx={{ marginTop: 2 }}
          />
          <Box sx={{ marginTop: 2, marginBottom: 10 }}>
            <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#4E5452' }}>
              Оформить заказ
            </Button>
          </Box>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default CheckoutPage;
