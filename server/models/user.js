const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {type: String, require: true},
    email:{type: String, require: true, unique:true},
    password:{type: String, require: true},
    quote:{type: String}
},

{
    collection: 'user-data'
})

const UserModel = mongoose.model('UserData', User);


module.exports = UserModel ;
