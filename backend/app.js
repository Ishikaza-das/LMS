const express = require('express');
const cookieParser = require('cookie-parser');
const cros = require('cors');
require('dotenv').config({ quiet: true });

const app = express();

app.use(cros({
    // origin,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

module.exports = app;