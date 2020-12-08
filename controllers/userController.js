const UserModel = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
//const { request } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');

exports.createUser = async (request, response) => {
    console.log(request.body)

    //initial validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors : errors.array()})
    }
    //Validate unique email
    const { email, password } = request.body;

    try {
        //Validate unique email
        let user = await UserModel.findOne({ email });
        
        if (user) {
            return response.status(400).json({ msg: 'The user already exists' })
        }

        //create new user with the model
        user = new UserModel(request.body);

        //hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password , salt)

        //Save user
        console.log('Save user');
        await user.save();

        //Create jwt
        const payload = {
            user: {
                id: user.id
            }
        };
        //Sign jwt
        jwt.sign(payload, process.env.SECRET_WORD,
            {
               expiresIn: 3600
            },
            (error, token) => {
                if (error) {
                    throw error;
                }

                response.json({ token: token })
            }
        )


        
    } catch (error) {
        console.log(error)
        response.status(400).send('General error')
    }
}