const userDB = {
    users: require('../model/userSchema'),
    setUsers: function(data) {this.user = data}
}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fsPromises = require('fs').promises 
const path = require('path')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body 

    if(!user || !pwd) return res.status(400).json({'message': 'Username and Password are required.'})

    const foundUser = userDB.users.find(person => person.username === user)
    if(!foundUser) return res.sendStatus(401)
    
    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match) {
        /* Give norm jwt token's access for the login page or ra refresh and then direct them to the userpage?? */

    }
}