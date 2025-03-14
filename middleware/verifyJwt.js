const jwt = require('jsonwebtoken')


const verifyJwt = (req, res, next) => {
    console.log("verifying!")
    const authHeader = req.headers.authorization || req.headers.Authorization 
    if(!authHeader?.startsWith('Bearer')) return res.status(401).json({'message': 'forbideen token, or something?'})

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            
            req.user = decoded.Userinfo.username
            req.roles = decoded.Userinfo.roles
            next() 
        }
    )
}

module.exports = verifyJwt
