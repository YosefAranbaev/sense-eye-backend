const {Schema, model} = require('mongoose');
const frameSchema = new Schema({
    heatmap: { type: Buffer},
    traces: { type: Buffer },
    orgName: { type: String},
    gameID: { type: String}
  
} ,{collection:'frame'});

const Frame = model('Frame',frameSchema)

module.exports = Frame;