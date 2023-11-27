const express = require('express');

const multer = require('multer');
const { AddCustomer, getCustomers } = require('../controllers/customers');
const verify = require('../middleware/auth');


const router = express.Router();

//signup at /api/user/signup
router.post('/add-customer', verify, AddCustomer);
//get all customers at /api/users/all
router.get('/customers', verify, getCustomers)




//login a /api/user/login




module.exports = { router }