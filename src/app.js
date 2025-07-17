const express = require('express');
const app = express();

const sweetRoutes = require('./addSweet/addSweet.route');
const deleteSweetRoutes = require('./deleteSweet/deleteSweet.route');
const searchSweetRoutes = require('./searchSweet/searchSweet.route');

app.use(express.json());
app.use('/', sweetRoutes);
app.use('/', deleteSweetRoutes);
app.use('/', searchSweetRoutes);

module.exports = app;
