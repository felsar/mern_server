const UserModel = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authenticateUSer = async (request, response) => {
    console.log(request.body)

    //initial validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() })
    }
    //get unique email
    const { email, password } = request.body;

    try {
        //Validate user exists
        let user = await UserModel.findOne({ email });

        if (!user) {
            return response.status(400).json({ msg: 'User or password incorrect' })
        }
        console.log(user);
        //Password match
        const correctPassword = await bcryptjs.compare(password, user.password);
        if (!correctPassword)
            return response.status(400).json({ msg: 'User or password incorrect' })
        console.log("Is correct:" + correctPassword);
        
        //Create jwt
        const payload = {
            user: {
                id: user.id
            }
        };
        //Sign jwt
        console.log('Secret' + process.env.SECRET_WORD )
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