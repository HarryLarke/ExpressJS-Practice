const express = require('express')
const router = express.Router() 
const path = require('path')

router.route('/')

    .get( (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'userPage.html'))} ) //No role verification required! 
    
    //will need to JWT before entering for security! Then be sent to the userPage.html!! Could add a viewing area with the different employee with a crud operator!


module.exports = router 