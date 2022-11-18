const express = require('express');
const customerController = require('../controllers/customer-controller');

const router = express.Router();

router
    .post('/create', customerController.onCreateCustomer)

module.exports = router;
