const Router = require('express').Router(); 
//Essa é a constante com o nome que a gente tá dando ao modelo
const User = require('../models/models');
const bcrypt = require('bcrypt'); 
const auth = require('./PrivateRoute')
const { RegisterValidation, LoginValidation } = require('../validation');
require('dotenv').config(); 
const JWT = require('jsonwebtoken');

    Router.post('/register', async (req, res) => {

        //Validação dos dados do Formulário
        const { error } = RegisterValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message);

        //Protegendo a Senha
        const salt = await bcrypt.genSalt(10)
        const HashedPass = await bcrypt.hash(req.body.password, salt)

        //O email já existe? 

        const EmailExists = await User.findOne({email: req.body.email})
            if(EmailExists) return res.status(400).send('The email has already been cadastrated. Did you forgot your password?')

        const user = new User({
            name: req.body.name, 
            password: HashedPass, 
            email: req.body.email
        })

        const SaveUser = await user.save()
            res.send(user)
    })

    Router.post ('/login', async (req, res) => {
       
    const { error } = LoginValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message)

    //O email existe? 

    const user = await User.findOne({email: req.body.email})
            if(!user) return res.status(400).send('Email incorrect or not cadastrated');
    
    //Confirmando a senha 

    const PasswordChecker = await bcrypt.compare(req.body.password, user.password)
        if (!PasswordChecker) return res.status(400).send('Password Incorect');

    
    //Nosso Token
    
    const token = JWT.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.json({
        token,
        user: {
          id: user._id,
        },
      });

    })

    //O token é verificado (Adicionei essa função por causa do 2 tutorial)
    Router.post("/tokenIsValid", async (req, res) => {
        try {
          const token = req.header("auth-token");
          if (!token) return res.json(false);
      
          const verified = JWT.verify(token, process.env.TOKEN_SECRET);
          if (!verified) return res.json(false);
      
          return res.json(true);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });

    Router.get('/', auth, async (req, res) => {
        const user = await User.findById(req.user); 
        res.json(user)
    })


module.exports = Router;