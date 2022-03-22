
const jwt = require('jsonwebtoken');

const secretKey = process.env.secretKey

const createToken = (payload) => {
    return jwt.sign(payload, secretKey)
}

const compareToken = (payload) => {
    return jwt.verify(payload, secretKey)
}

module.exports = { createToken, compareToken }