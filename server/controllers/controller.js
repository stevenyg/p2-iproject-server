const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { User, Plan, UserPlan } = require('../models/index');
const { Op } = require("sequelize");
class Controller {

    static async doRegister(req, res, next) {
        try {
            const { email, password } = req.body

            const data = await User.create({ email, password, StripeUserId: 1 })

            res.status(201).json({ message: "User Created" })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async doLogin(req, res, next) {
        try {
            const { email, password } = req.body

            const data = await User.findOne({
                where: {
                    email
                }
            })

            if (!data) {
                throw {
                    code: 401,
                    name: "AuthenticationError",
                    message: "Invalid Email or Password"
                }
            }

            const verifyPassword = comparePassword(password, data.password)

            if (!verifyPassword) {
                throw {
                    code: 401,
                    name: "AuthenticationError",
                    message: "Invalid Email or Password"
                }
            }

            const payload = {
                id: data.id,
                email: data.email,
                StripeUserId: data.StripeUserId
            }

            const token = createToken(payload)
            res.status(200).json({ access_token: token })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}

module.exports = Controller