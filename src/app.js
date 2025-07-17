const express = require('express');
const app = express();

const sweetRoutes = require('./addSweet/addSweet.routes');
const deleteSweetRoutes = require('./deleteSweet/deleteSweet.routes');

app.use(express.json());
app.use('/', sweetRoutes);
app.use('/', deleteSweetRoutes);

module.exports = app;
