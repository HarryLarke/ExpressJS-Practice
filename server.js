require('dotenv').config()
const express = require('express')
const app = express() 
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const { logger } = require('./middleware/logEvents')
const logError = require('./middleware/logError')
const connectDB = require('./config/dbConn')
const verifyJwt = require('./middleware/verifyJwt')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3500

connectDB()
app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '/public')))


app.use('/', require('./routes/root'))
app.use('/reg', require('./routes/reg'))
app.use('/login', require('./routes/login'))
app.use('/auth', require('./routes/auth'))
app.use('/logout', require('./routes/logout'))
app.use('/', require('./routes/api/postUsers')) //Move this after verify?? and add a post element to reg route?

app.use(verifyJwt)
app.use('/userPage', require('./routes/userPage'))
//JWT controller here!! 

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if(req.accepts('json')) {
        res.json({error: "404 Not Found!"})
    }
    else {
        res.type('txt').send('404 Not Found!')
    }
})

app.use(logError)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDb!')
    app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
})

