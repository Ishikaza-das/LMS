const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({ quiet: true });

const userRoute = require('./routes/user.route');
const courseRoute = require('./routes/course.route');
const lessonRoute = require('./routes/lesson.route');
const paymentRoute = require('./routes/payment.route');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND || 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(cookieParser());

app.use('/lms/v1/user',userRoute);
app.use('/lms/v1/course',courseRoute);
app.use('/lms/v1/lesson',lessonRoute);
app.use('/lms/v1/payment',paymentRoute);

module.exports = app;