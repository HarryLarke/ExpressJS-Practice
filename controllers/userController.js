const { format } = require('date-fns') 
const { v4: uuid } = require('uuid')

const fsPromises = require('fs').promises
const path = require('path')


const addNewUser = async (req, res) => {
    const newUser = {
        username : req.body.user,
        password : req.body.pwd
    }

    if(!newUser.username || !newUser.password) {
        return res.status(400).json({'message': 'Please add a username or password'})
    }

    const dateTime = `${format(new Date(), "ss:mm:HH\tddMMyyyy")}`
    const user = `${dateTime}\t${uuid()}\t${newUser.username}\n`

    try {
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'userData.txt'), user)
        return  res.status(201).json({'message': `New user ${newUser.username} added.`})
        } catch(err) {
            console.error(err)
        } 
    
}


module.exports = addNewUser