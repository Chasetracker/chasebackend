const express = require('express');
const verify = require('../middleware/auth');
const { createInvoice, getInvoices } = require('../controllers/Records')

const router = express.Router()


//create at /api/user/ministry
router.post('/invoices', verify, createInvoice);
router.get('/get-invoices', verify, getInvoices)

module.exports = { router }

