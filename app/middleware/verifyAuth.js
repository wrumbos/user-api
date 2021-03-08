require('dotenv').config()

const jwt = require('jsonwebtoken')
const {
    errorMessage, status,
} = require('../utils/status')

const verifyToken = async (req, res, next) => {
    console.log("pruebaaaaaaaaaaaaaa");
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const decoded =  jwt.verify(token, process.env.SECRET);
        req.user = {
            email: decoded.email,
            user_id: decoded.user_id,
            is_admin: decoded.is_admin,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
        };
        next();
    } catch (error) {
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};

module.exports = verifyToken;
