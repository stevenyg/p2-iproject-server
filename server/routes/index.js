const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication');

router.post('/user/register', Controller.doRegister)
router.post('/user/login', Controller.doLogin)

router.use(authentication)

router.post('/user/card', Controller.stripeTokenRetrieve)
router.patch('/user/update', Controller.stripeUpdateSubscription)

module.exports = router