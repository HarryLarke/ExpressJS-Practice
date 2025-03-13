const allowOrigins = require('./allowOrigins')
//Will need to look further into this! 
const corsOptions = {
    origin : (origin, callback) => {
        if (allowOrigins.indexOf(origin)) 
            { 
                callback(null, true) 
            }
        else {
        callback(new Error('Not allowed by CORS'))
    } }, 
    optionsSuccesStatus : 200
}

module.exports = corsOptions 