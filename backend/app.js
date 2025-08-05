const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({ quiet: true });

const userRoute = require('./routes/user.route');
const courseRoute = require('./routes/course.route');
const lessonRoute = require('./routes/lesson.route');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND,
    methods: ['GET','POST','DELETE','PUT'],
    credentials: true,
    allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());
app.use(cookieParser());

app.use('/lms/v1/user',userRoute);
app.use('/lms/v1/course',courseRoute);
app.use('/lms/v1/lesson',lessonRoute);

module.exports = app;