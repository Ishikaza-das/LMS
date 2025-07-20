const express = require('express');
const cookieParser = require('cookie-parser');
const cros = require('cors');
require('dotenv').config({ quiet: true });

const userRoute = require('./routes/user.route');
const courseRoute = require('./routes/course.route');

const app = express();

app.use(cros({
    // origin,
    methods:['GET','POST','DELETE','PUT'],
    // credentials:true,
    allowedHeaders: ['Content-Type','Authorization'],
}));
app.use(express.json());
app.use(cookieParser());

app.use('/lms/v1/user',userRoute);
app.use('/lms/v1/course',courseRoute);

module.exports = app;