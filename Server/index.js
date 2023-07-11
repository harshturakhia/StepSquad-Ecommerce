//Imports
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require("cors");

//Files
const userRoutes = require('./routes/user.js')
const authRoutes = require('./routes/auth.js')
const productRoutes = require('./routes/Product.js')
const cartRoutes = require('./routes/Product.js')
const orderRoutes = require('./routes/Product.js')
const stripeRoute = require("./routes/stripe");


//Logic
app.use(cors())
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
// app.use('/api/checkout', stripeRoutes)


//Database
mongoose.connect('mongodb://127.0.0.1:27017/Lamadev', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected!');
    })
    .catch((err) => {
        console.log(err);
    })



//Server
const PORT = 9898 || process.env.PORT
app.listen(PORT, () => {
    console.log(`Serverr running on port ${PORT}!`)
})