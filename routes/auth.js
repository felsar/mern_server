//User Authentication
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/authController')

/*
* This file is called in index.js
* It's defininf the initial route, that will be api/users/
*/

/* 
* api/auth
*/
//Validate before call controller
//call conteoller
router.post('/',
    [
        check('email', 'Email is nos valid').isEmail(),
        check('password', 'Passwod should have at least 6 characters').isLength({ min: 6 })

    ],
    authController.authenticateUSer
);

module.exports = router;