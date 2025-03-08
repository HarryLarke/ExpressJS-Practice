const logEvents = require('./logEvents')

const logError = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
    console.log(err.stack)
    res.status(500).send(err.message)
}

module.exports = logError