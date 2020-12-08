//Create Users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../controllers/userController')

/*
* This file is called in index.js
* It's defininf the initial route, that will be api/users/
*/

/* Create user
* api/users
*/
//Validate before call controller
//call conteoller
router.post('/',
    [
        check('username', 'username is mandatory').not().isEmpty(),
        check('email', 'Email is nos valid').isEmail(),
        check('password', 'Passwod should have at least 6 characters').isLength({min: 6})

    ],
    userController.createUser

);

module.exports = router;