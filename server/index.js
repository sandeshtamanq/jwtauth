// Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const jwt = require('jsonwebtoken');
// Express
const app = express();
// Middlewares
app.use(express.json())
app.use(cors())

// mongodb connection
mongoose.connect('mongodb://localhost:27017/authentication');
// UserRegister
app.post('/api/register', async (req, res) => {
    try{
        await User.create({
            name: req.body.userName,
            password: req.body.password,
            email: req.body.email
        })
        res.json({status:"OK", wow:'wow'})
    }catch(err){
        console.log(err)
        res.json({status:"error", error:'Duplicate Email'})
    }
    
})

// UserLogin

app.post('/api/login',async (req, res) => {
    
   const user = await User.findOne({
            password: req.body.password,
            email: req.body.email
        })
        
        if(user){
            const token = jwt.sign({
                email: req.body.email,
                password: req.body.password
            },'secretkey123')
            return res.json({status:'ok', user:token})
        }else{
            return res.json({status:'error', user: false})
        }
})


// Quotes Get Request
app.get('/api/quotes',async (req, res) => {
    const token = req.headers['x-access-token'];
    
    try{
        const decode = jwt.verify(token, 'secretkey123');
        console.log(decode)
        const email = decode.email;
        const user= await User.findOne({email:email})
        res.json({status:'Ok', quote:user.quote});
    }catch(err){
        console.log('get')
        console.log(err)
        res.json({status:'Error', error:"Invalid token"})
    }
})

// Quote Post Request
app.post('/api/quotes',async (req, res) => {
    const token = req.headers['x-access-token'];
    
    try{
        const decode = jwt.verify(token, 'secretkey123');
        console.log(decode)
        const email = decode.email;
        const response=await User.updateOne({
            email:email
        },
        {$set:{quote:req.body.quote}}) 
        res.json({status:'Ok'});
    }catch(err){
        console.log(err)
        console.log('post')
        res.json({status:'Error', error:"Invalid token"})
    }
})
app.listen(3001, () => {
    console.log('listening to 3001')
})