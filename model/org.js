const {Schema, model} = require('mongoose');
const orgSchema = new Schema({
    name : {type:String}
} ,{collection:'organizations'});

const Org = model('Org',orgSchema)

module.exports = Org;