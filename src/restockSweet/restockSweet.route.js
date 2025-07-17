const express = require('express');
const router = express.Router();
const restockSweet = require('./restockSweet.controller');

router.put('/sweets/:sweetId/restock', restockSweet);

module.exports = router;
