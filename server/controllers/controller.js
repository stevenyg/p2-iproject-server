const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { User, Plan, UserPlan } = require('../models/index');
const { Op } = require("sequelize");
const stripe = require('stripe')('sk_test_51KZVEYFHOJ7vfyPMdIRaLdYd3lnAG9GoSboaey78oq1Fry6qchHQ8y39AP9svT4qYzPNOVdN88EHMs062knU5MWy00GrDE6Qgp');

class Controller {

    static async doRegister(req, res, next) {
        try {
            const { email, password } = req.body

            const customer = await stripe.customers.create({
                email,
            });

            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [
                    { price: 'price_1Kg17MFHOJ7vfyPMRkJje6lt' },
                ],
            });

            const data = await User.create({ email, password, StripeUserId: customer.id, PlanId: 1, StripeSubscriptionId: subscription.id })

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
            res.status(200).json({ access_token: token, email: data.email, PlanId: data.PlanId })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async updateSubscription(req, res) {
        try {

            // const data = User.update()

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }


}

module.exports = Controller