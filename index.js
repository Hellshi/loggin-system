const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const Post = require('./routes/Post')
const Auth = require('./routes/userRouter')

const app = express(); 
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000

app.listen(PORT, () => 
    {console.log(`O administrador está online no camarote ${PORT}`)})

//Conenct to Mongoose

mongoose.connect(process.env.MONGOOSE_CONECT, {
     useUnifiedTopology: true ,
     useNewUrlParser: true ,
}, () => {console.log('Tá liberado o banco')});

//Incluindo Middleware: 

app.use('/posts', Post)

app.use('/user', Auth); 

