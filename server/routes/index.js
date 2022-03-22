const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication');

router.post('/user/register', Controller.doRegister)
router.post('/user/login', Controller.doLogin)

// router.use(authentication)

// router.get('/user/coin', Controller.getCoin)

module.exports = router