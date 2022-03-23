const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { User, Plan, UserPlan } = require('../models/index');
const { Op } = require("sequelize");
const { sendAutoMailer } = require('../helpers/nodemailer');
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

            let isCardSaved = false
            if (data.StripeCardId !== null) {
                isCardSaved = true
            }

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
            let card = {}

            if (data.StripeCardId) {
                card = await stripe.customers.retrieveSource(
                    data.StripeUserId,
                    data.StripeCardId
                );
            }





            const payload = {
                id: data.id,
                email: data.email,
                StripeUserId: data.StripeUserId
            }

            const token = createToken(payload)
            res.status(200).json({ access_token: token, email: data.email, PlanId: data.PlanId, isCardSaved, card })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // static async updateSubscription(req, res) {
    //     try {

    //         // const data = User.update()

    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: "Internal Server Error" })
    //     }
    // }



    static async stripeTokenRetrieve(req, res) {
        try {

            const { token, email } = req.body


            const data = await User.findOne({ where: { email } })


            const card = await stripe.customers.createSource(
                data.StripeUserId,
                { source: token.id }
            );
            console.log(card);

            const response = await User.update(
                {
                    StripeCardId: card.id
                }, {
                where: {
                    email: data.email
                }
            })

            res.status(200).json({ message: "StripeCardId add success" })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async stripeUpdateSubscription(req, res) {
        try {
            // PlanId = new PlanId
            const { email, PlanId } = req.body

            const data = await User.findOne({ where: { email } })

            const data2 = await Plan.findOne({ where: { id: PlanId } })

            console.log(data2.StripePlanId);

            const subscription = await stripe.subscriptions.update(data.StripeSubscriptionId, {
                items: [
                    { price: data2.StripePlanId },
                ],
            });

            const data3 = await User.update(
                {
                    PlanId: PlanId
                }, {
                where: {
                    email: data.email
                }
            })

            sendAutoMailer(data.email, `Subscription Succesfully Changed`, `Congratulation subscription succesfully changed`)

            res.status(200).json({ message: 'Stripe Subscription Updated' })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }


}

module.exports = Controller