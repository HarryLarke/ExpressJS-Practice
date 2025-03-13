const express = require('express')
const router = express.Router() 
const userController = require('../../controllers/userController')

router.route('/users')

    .post(userController)
    .get()//Fill in! 
    

module.exports = router