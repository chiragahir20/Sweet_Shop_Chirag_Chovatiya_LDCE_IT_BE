const express = require('express');
const router = express.Router();
const searchSweet = require('./searchSweet.controller');

router.get('/sweets/search', searchSweet);

module.exports = router;
