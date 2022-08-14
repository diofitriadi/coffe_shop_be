const express = require("express");
const app = express()
const productsRoutes = require('./productsRoutes')
const authRoutes = require('./authRoutes')


app.use('/products', productsRoutes)
app.use('/auth', authRoutes)




module.exports = app