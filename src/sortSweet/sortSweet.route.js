const express = require('express');
const router = express.Router();
const sortSweet = require('./sortSweet.controller');

router.get('/sweets/sort', sortSweet);

module.exports = router;
