const { compareToken } = require("../helpers/jwt")
const { User } = require('../models/index');

const authentication = (req, res) => {


    try {
        const { access_token } = req.headers

        const payload = compareToken(access_token)

        const userFound = User.findByPk(payload.id)

        if (!userFound) {
            throw {
                code: 401,
                name: "AuthenticationError",
                message: "User not found Authentication Failed"
            }
        }

        req.userLoggedIn = {
            id: userFound.id,
            email: userFound.email,
            StripeUserId: userFound.StripeUserId
        }

        next()
    } catch (error) {
        console.log(error);
        next(error)
    }

}

module.exports = authentication