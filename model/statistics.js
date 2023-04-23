const {Schema, model} = require('mongoose');
const statisticsSchema = new Schema({
    status: { type: String},
    ballHoldersList: { type: String },
    orgName: { type: String}
  
} ,{collection:'Statistics'});

const Statistics = model('Statistics',statisticsSchema)

module.exports = Statistics;