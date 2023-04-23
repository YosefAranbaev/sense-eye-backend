const {Schema, model} = require('mongoose');
const statisticsSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    mode: { type: String },
    orgName: { type: String}
  
} ,{collection:'Statistics'});

const Statistics = model('Statistics',statisticsSchema)

module.exports = Statistics;