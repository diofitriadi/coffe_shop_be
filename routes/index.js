const express = require("express");
const app = express()
const productsRoutes = require('./productsRoutes')


app.use('/products', productsRoutes)




module.exports = app