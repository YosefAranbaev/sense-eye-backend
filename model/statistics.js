const {Schema, model} = require('mongoose');
const statisticsSchema = new Schema({
    frame: {type : String},
    orgName: { type: String },
    gameID: { type: String }  
} ,{collection:'Statistics'});

const Statistics = model('Statistics',statisticsSchema)

module.exports = Statistics;