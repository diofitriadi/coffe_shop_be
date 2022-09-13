const express = require("express");
const app = express()
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')



app.use('/product', productRoutes)
app.use('/auth', authRoutes)




module.exports = app