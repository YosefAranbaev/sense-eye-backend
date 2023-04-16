const {Schema, model} = require('mongoose');
const userSchema = new Schema({
    email : {type:String},
    name : {type:String},
    org_name : {type:String},
    password : {type:String},
    role : {type:String}
} ,{collection:'users'});

const User = model('User',userSchema)

module.exports = User;