const JWT = require('jsonwebtoken')

module.exports = function (req, res, next ) {

const token = req.header('auth-token');
    if(!token) return res.status(500).send('Acess Denied');

    try {
        const Verified = JWT.verify(token, process.env.TOKEN_SECRET)
        req.user = Verified
        next()
    } catch (err) {
        if(err) return res.status(500).send('Unexpected Token')
    }
}