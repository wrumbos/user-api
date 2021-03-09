require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};

const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    } return true;
};

const empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

const generateUserToken = (email, id, first_name, last_name) => {
    const token = jwt.sign({
            email,
            user_id: id,
            first_name,
            last_name,
        },
        process.env.SECRET, { expiresIn: '3d' });
    return token;
};

const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    hashPassword,
    generateUserToken,
    comparePassword
};
