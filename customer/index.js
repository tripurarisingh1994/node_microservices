const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();


// Routes
const customerRouter = require('./routes/customer-router');

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}));


app.use('/customer', customerRouter);

app.listen(8001, () => {
    console.log('Customer is listing to Port 8001');
}) 