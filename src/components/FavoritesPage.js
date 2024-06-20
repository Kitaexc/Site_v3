import React from 'react';
import { Container, Grid, Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import Footer from './Footer';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesPage = () => {
  const { favoriteItems, removeFromFavorites } = useFavorites();

  return (
    <>
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          {/* Левая часть - карточки товаров */}
          <Grid item xs={12} md={12} sx = {{marginTop: 2, marginBottom: 30}}>
            {favoriteItems.map((item) => (
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
                  <Button variant="contained" color="secondary" onClick={() => removeFromFavorites(item.id)} sx={{ backgroundColor: '#4E5452' }}>
                    Удалить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default FavoritesPage;
