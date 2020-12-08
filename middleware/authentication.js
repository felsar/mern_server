const jwt = require('jsonwebtoken');



module.exports = function (request, response, next) {
    console.group('Auth Midleware')
    //Read Token from header
    const token = request.header('x-auth-token');

    console.log("token: "+token);

    if (!token)
        return response.status(401).json({ msg: 'Token must be sent' })
    
    try {
        const cypher = jwt.verify(token, process.env.SECRET_WORD);
        request.user = cypher.user;
        next();

    } catch (e) {
        response.status(401).json({msg: 'Invalid Token'})
    }
}