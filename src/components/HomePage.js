import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, CardActionArea, Button, Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import banner from '../assets/HomePage/banner.webp';
import Footer from './Footer';
import Confetti from 'react-confetti';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const { addToCart } = useCart();
  const { addToFavorites, favoriteItems } = useFavorites();

  useEffect(() => {
    fetch('http://localhost:5000/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

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

  const faqs = [
    {
      question: 'Как выбрать подходящий автомобиль для моих нужд?',
      answer: 'Выбор подходящего автомобиля зависит от множества факторов, включая ваш бюджет, стиль жизни, размер семьи и личные предпочтения. Если вы часто ездите в городских условиях, компактный автомобиль с хорошей экономией топлива может быть идеальным выбором. Для большой семьи подойдет внедорожник или минивэн. Если вы любите приключения и поездки за город, обратите внимание на кроссоверы или внедорожники с полным приводом. Наши консультанты помогут вам определить ваши потребности и предложат несколько моделей на выбор.'
    },
    {
      question: 'Какие документы необходимы для покупки автомобиля?',
      answer: 'Для покупки автомобиля вам потребуются паспорт, водительское удостоверение, а также ИНН (индивидуальный номер налогоплательщика). Если вы планируете приобретать автомобиль в кредит, вам также понадобятся справка о доходах и копия трудовой книжки. В некоторых случаях могут потребоваться дополнительные документы, такие как подтверждение адреса проживания.'
    },
    {
      question: 'Можно ли купить автомобиль в кредит и какие условия?',
      answer: 'Да, у нас вы можете приобрести автомобиль в кредит. Мы сотрудничаем с несколькими банками, что позволяет предложить вам выгодные условия кредитования. Основные условия включают первоначальный взнос (обычно от 10-20% от стоимости автомобиля), срок кредита (от 1 до 7 лет) и процентную ставку (от 8% годовых). Наши финансовые консультанты помогут вам выбрать оптимальную программу кредитования.'
    },
    {
      question: 'Есть ли у вас программа трейд-ин и как она работает?',
      answer: 'Да, у нас действует программа трейд-ин. Вы можете обменять свой старый автомобиль на новый с доплатой. Процесс начинается с оценки вашего автомобиля нашими специалистами. После согласования стоимости вы можете выбрать новый автомобиль, и стоимость вашего старого автомобиля будет учтена в качестве первоначального взноса. Это удобный способ обновить автомобильный парк без значительных финансовых затрат.'
    },
    {
      question: 'Какие гарантии вы предоставляете на автомобили?',
      answer: 'На все новые автомобили предоставляется заводская гарантия, которая обычно составляет от 3 до 5 лет или до 100 000 километров пробега, в зависимости от марки и модели. На подержанные автомобили мы предоставляем собственную гарантию на срок до 1 года, которая включает в себя основные узлы и агрегаты. Гарантия позволяет вам быть уверенными в качестве приобретенного автомобиля.'
    },
    {
      question: 'Какие дополнительные услуги вы предоставляете?',
      answer: 'Мы предоставляем широкий спектр дополнительных услуг, включая установку дополнительного оборудования (сигнализация, мультимедийные системы, парктроники), техническое обслуживание и ремонт, шиномонтаж, а также помощь в регистрации автомобиля в ГИБДД. Кроме того, у нас можно оформить страхование (КАСКО и ОСАГО) прямо в автосалоне.'
    },
    {
      question: 'Можно ли провести тест-драйв перед покупкой?',
      answer: 'Конечно, мы настоятельно рекомендуем провести тест-драйв перед покупкой автомобиля. Это позволит вам лучше понять особенности модели, оценить комфорт и управляемость. Записаться на тест-драйв можно по телефону или через наш сайт, указав удобное для вас время и модель автомобиля, который вы хотите протестировать.'
    },
    {
      question: 'Какие автомобили есть в наличии?',
      answer: 'В нашем автосалоне представлен широкий ассортимент автомобилей различных марок и моделей. Вы можете ознакомиться с наличием автомобилей на нашем сайте или позвонить в автосалон. Если нужной вам модели нет в наличии, мы можем заказать её напрямую у производителя. Также мы регулярно обновляем наш парк подержанных автомобилей, которые проходят тщательную проверку перед продажей.'
    },
    {
      question: 'Как происходит процесс оформления покупки автомобиля?',
      answer: 'Процесс оформления покупки автомобиля включает несколько шагов. Сначала вы выбираете автомобиль и обсуждаете условия покупки с нашим менеджером. Затем происходит оформление необходимых документов, включая договор купли-продажи, страхование и регистрацию. Если автомобиль приобретается в кредит, дополнительно оформляется кредитный договор. Весь процесс обычно занимает от нескольких часов до одного дня.'
    },
    {
      question: 'Какие скидки и акции у вас есть на данный момент?',
      answer: 'Мы регулярно проводим различные акции и предлагаем скидки на автомобили. Это могут быть сезонные распродажи, специальные предложения для определённых моделей, а также скидки при покупке в кредит или трейд-ин. Актуальную информацию о действующих акциях вы можете узнать на нашем сайте или у наших менеджеров. Мы всегда рады предложить вам выгодные условия для покупки автомобиля.'
    }
  ];

  return (
    <Container maxWidth={false} disableGutters>
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />} {/* Конфетти */}
      <Box
        sx={{
          width: '100%',
          height: '400px',
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <Box>
          <Typography variant="h3" component="p" sx={{ marginTop: 45, fontFamily: 'Victor Mono, monospace'}}>
            ВСЁ МЕНЯЕТСЯ. ЦЕННОСТИ ОСТАЮТСЯ!
          </Typography>
        </Box>
      </Box>
      <Container sx={{ padding: '20px' }}>
        <Typography variant="h4" component="h2" gutterBottom align='center'>
          ВЫБЕРИТЕ ДЛЯ СЕБЯ 
        </Typography>
        <Grid container spacing={4}>
          {cars.slice(0, 8).map((car) => (
            <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
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
        <Box display="flex" justifyContent="center" marginTop={4}>
          <Button variant="contained" color="primary" component={Link} to="/catalog" sx={{ backgroundColor: '#4E5452' }}>
            В каталог
          </Button>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom align='center'>
            Часто задаваемые вопросы
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
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

export default HomePage;
