const Joi = require('joi'); 

const RegisterValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
        .min(6)
        .required(), 

        password: Joi.string()
        .min(6)
        .max(1024)
        .required(), 

        email: Joi.string()
        .email()
        .required(), 
    }) 
    return schema.validate(data)
}

const LoginValidation = data => {
    const schema = Joi.object({

        password: Joi.string()
        .min(6)
        .max(1024)
        .required(), 

        email: Joi.string()
        .email()
        .required(), 
    }) 
    return schema.validate(data)
}

module.exports.RegisterValidation = RegisterValidation
module.exports.LoginValidation = LoginValidation