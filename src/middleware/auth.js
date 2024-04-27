const jwt = require('jsonwebtoken');
const config = require('../config/production.json');

module.exports = function (req, res, next) {
    // Get token from the header
    const token = req.header('x-auth-token');

    console.log(token);

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        req.user = decoded.user;
        console.log(decoded);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}