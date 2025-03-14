const User = require('../model/userSchema') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body 

    if(!user || !pwd) return res.status(400).json({'message': 'Username and Password are required.'})

    const foundUser = await User.findOne({ username: user}).exec()
    if(!foundUser) return res.sendStatus(401)
    
    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match) {
       const roles = Object.values(foundUser.roles)

       const accessToken = jwt.sign({
            "Userinfo": {
                "username": foundUser.username,
                "roles": roles
            }}, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '360s'})
        
        const refreshToken = jwt.sign({
            "UserInfo": {
                "username" : foundUser.username
            }},
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '1d'}
        )
        //Will how to save refreshToken onto DB - will leave for now?!
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result)

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({accessToken})

    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }