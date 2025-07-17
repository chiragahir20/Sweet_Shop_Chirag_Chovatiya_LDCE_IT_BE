const express = require('express');
const router = express.Router();
const purchaseSweet = require('./purchaseSweet.controller');

router.put('/sweets/:sweetId/purchase', purchaseSweet);

module.exports = router;
