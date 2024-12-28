// import express from 'express';
const express = require('express')
const router = express.Router({ mergeParams: true });
const { createUser, userLogin, userLogout, validUser, allUsers } = require("../controllers/user.controller");
const authenticate = require('../middlewares/authenticate');


// Route to create a new user
router.post('/signup', createUser);

// Route to Login the user
router.post('/login', userLogin);

// Route to Login the user
router.get('/logout', authenticate, userLogout);

// Route to Validate the user
router.get('/validuser', authenticate, validUser);

router.get('/allusers', authenticate, allUsers)

module.exports = router;