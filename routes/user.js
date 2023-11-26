const express = require('express');

const multer = require('multer');
const { login, signUp, verifyEmail, getAllCustomers, getSingleCustomer} = require('../controllers/user');


const router = express.Router();


router.get('/getCustomers', getAllCustomers);

router.get('/:id', getSingleCustomer);

//signup at /api/user/signup
router.post('/signup', signUp);

//login a /api/user/login
router.post("/login", login)

// verify user email api/user/verify/email/:id/:token
router.get('/verify/email/:id/:token', verifyEmail);

module.exports = { router }
