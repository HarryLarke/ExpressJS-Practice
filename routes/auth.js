const express = require('express')
const router = express.Router() 
const authController = require('../controllers/authController')
const path = require('path')

router.post('/', authController.handleLogin) // send to the userPage?

module.exports = router