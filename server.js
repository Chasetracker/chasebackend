const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { application } = require('express');
const user = require('./routes/user').router
const invoiceRecord = require('./routes/invoices').router
const customers = require('./routes/customers').router
// const getGenerateUSer = require('./routes/generate').router

require('dotenv').config()

const app = express()
app.use(bodyParser.json());
app.use(cors())

// adding course
// checkng server



//test api  at /api/user/text
app.use("/api/user", user);
app.use('/api', invoiceRecord)
app.use('/api', customers)

//to test nodejs app
app.get('/', (req, res) => {
    res.send('Hello Backend is running');
})

//db config
const mongoURL = process.env.MONGODB_URL

// const port = 5000;
const PORT = process.env.PORT || 8000;

mongoose.set("strictQuery", true);


mongoose.connect(mongoURL)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });


app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`, 'mongodb connected')
})

module.exports = app