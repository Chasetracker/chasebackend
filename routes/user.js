const express = require('express');

const multer = require('multer');
const { login, signUp, verifyEmail} = require('../controllers/user');


const router = express.Router();



//signup at /api/user/signup
router.post('/signup', signUp);

//login a /api/user/login
router.post("/login", login)

// verify user email api/user/verify/email/:id/:token
router.get('/verify/email/:id/:token', verifyEmail);



module.exports = { router }
