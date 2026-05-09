require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');
const validationMiddleware = require('./middlewares/validation.middleware');


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Spotify Clone API!' });
});

module.exports = app;