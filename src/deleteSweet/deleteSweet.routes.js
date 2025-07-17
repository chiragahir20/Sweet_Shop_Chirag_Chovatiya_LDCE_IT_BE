const express = require('express');
const router = express.Router();
const deleteSweet = require('./deleteSweet.controller');

router.delete('/sweets/:sweetId', deleteSweet);

module.exports = router;
