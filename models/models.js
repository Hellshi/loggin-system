const mongoose = require('mongoose')
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        min: (6)
    }, 

    password: {
        type: String, 
        required: true, 
        min: (6), 
        max: (1024)
    },

    email: {
        type: String, 
        required: true, 
    }
})

module.exports = mongoose.model("Usuario", User)

