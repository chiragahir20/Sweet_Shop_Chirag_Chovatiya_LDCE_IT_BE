const express = require('express');
const router = express.Router();
const { addSweet } = require('./addSweet.controller');

router.post('/sweets', addSweet);

module.exports = router;
