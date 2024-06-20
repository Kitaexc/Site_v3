import React, { useState } from 'react';
import { Container, Grid, Box, Typography, Card, CardContent, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + (parseFloat(item.discount.replace(/\s+/g, '')) * item.quantity || 0), 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (parseFloat(item.price.replace(/\s+/g, '')) * item.quantity || 0), 0) - totalDiscount;

  const handleCheckout = () => {
    if (totalItems === 0) {
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ display: 'flex', marginBottom: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 250 }}
                  image={item.images}
                  alt={item.name}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h5" variant="h5">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Цена: {(parseFloat(item.price.replace(/\s+/g, '')) || 0).toLocaleString()} ₽
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Скидка: {(parseFloat(item.discount.replace(/\s+/g, '')) || 0).toLocaleString()} ₽
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Количество: {item.quantity}
                  </Typography>
                  <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.id)} sx={{ backgroundColor: '#4E5452' }}>
                    Удалить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Правая часть - информация о корзине */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, marginTop: 2, marginBottom: 10 }}>
              <Typography variant="h6" gutterBottom>
                Информация о корзине
              </Typography>
              <Typography variant="body1">
                Количество товаров: {totalItems}
              </Typography>
              <Typography variant="body1">
                Сумма скидки: {totalDiscount.toLocaleString()} ₽
              </Typography>
              <Typography variant="h6" gutterBottom>
                Итоговая стоимость: {totalPrice.toLocaleString()} ₽
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={totalItems > 0 ? "/checkout" : "#"}
                onClick={handleCheckout}
                sx={{ backgroundColor: '#4E5452' }}
              >
                Перейти к оформлению
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />

      {/* Диалоговое окно */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Информация</DialogTitle>
        <DialogContent>
          <Typography>Ваша корзина пуста. Пожалуйста, добавьте товары в корзину перед оформлением заказа.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartPage;
