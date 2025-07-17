const express = require('express');
const app = express();

const sweetRoutes = require('./addSweet/addSweet.route');
const deleteSweetRoutes = require('./deleteSweet/deleteSweet.route');
const searchSweetRoutes = require('./searchSweet/searchSweet.route');
const sortSweetRoutes = require('./sortSweet/sortSweet.route');
const restockSweetRoutes = require('./restockSweet/restockSweet.route');   
const purchaseSweetRoutes = require('./purchaseSweet/purchaseSweet.route');

app.use(express.json());
app.use('/', sweetRoutes);
app.use('/', deleteSweetRoutes);
app.use('/', searchSweetRoutes);
app.use('/', sortSweetRoutes);
app.use('/', restockSweetRoutes);
app.use('/', purchaseSweetRoutes);

module.exports = app;
