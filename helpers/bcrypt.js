const bcrypt = require('bcrypt');

const hashPassword = (plaintext) => {
    return bcrypt.hashSync(plaintext, 10)
}

const comparePassword = (input, hash) => {
    return bcrypt.compareSync(input, hash)
}

module.exports = { hashPassword, comparePassword }