const express = require('express');

const isAuthenticated = require('../middleware/authenticated');
const { createConnectAccount } = require('../controllers/connect.controller');

const router = express.Router();

router.post('/connect',isAuthenticated,createConnectAccount);

module.exports = router;