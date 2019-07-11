const express = require('express')
const signInController = require('../controllers/signin')

const router = express.Router()

router.post('/', signInController.signIn)

module.exports = router
