import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid } from '@mui/material';
import emailjs from 'emailjs-com';

const Footer = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      'service_qcgdf28',
      'template_38uwb9o',
      form,
      'M_8smC3lPV5M7OOsp'
    ).then((result) => {
      alert('Сообщение отправлено!', result.text);
    }, (error) => {
      alert('Ошибка при отправке сообщения!', error.text);
    });
    setForm({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <Box sx={{ backgroundColor: '#333', color: 'white', padding: '40px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Свяжитесь с нами
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Ваше имя"
                variant="outlined"
                fullWidth
                margin="normal"
                value={form.name}
                onChange={handleChange}
                required
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <TextField
                name="email"
                label="Ваш email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <TextField
                name="message"
                label="Сообщение"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <Button type="submit" variant="contained" color="primary">
                Отправить
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              О нас
            </Typography>
            <Typography variant="body2" paragraph>
              Мы предоставляем лучшие автомобили по самым выгодным ценам. Наша компания занимается продажей автомобилей уже более 10 лет и мы гордимся нашим сервисом и качеством обслуживания.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Контакты
            </Typography>
            <Typography variant="body2">
              Адрес: ул. Раменки, д. 9, г. Москва
            </Typography>
            <Typography variant="body2">
              Telegram: @SABE_support
            </Typography>
            <Typography variant="body2">
              Email: sabe_support@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
