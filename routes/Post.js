const Router = require('express').Router();
const verify = require('./PrivateRoute')

Router.get('/', verify, (req, res) => {
    res.json({
        posts:{"title": "You should see me with a crown, honey"}
    })
})

module.exports = Router