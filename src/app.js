const express = require('express');
const app = express();
const sweetRoutes = require('./addSweet.routes');

app.use(express.json());
app.use('/', sweetRoutes);

module.exports = app;
