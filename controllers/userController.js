const User = require('../model/userSchema')
const bcrypt = require('bcrypt')


const addNewUser = async (req, res) => {
    const { user, pwd } = req.body

    if(!user|| !pwd) {
        return res.status(400).json({'message': 'Please add a username or password'})
    } 

    const duplicate = await User.findOne({ username: user }).exec()
    if(duplicate) return res.sendStatus(409) 

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10)

        const result = await User.create({
            'username': user,
            'password': hashedPwd
        })
        console.log(result)
        res.status(201).json({'message': `New user ${user} added!`})
        } catch(err) {
            res.status(500).json({'message': err.message}) 
        }
    
} 




module.exports = addNewUser