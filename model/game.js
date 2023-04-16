const {Schema, model} = require('mongoose');
const gameSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    mode: { type: String },
    orgName: { type: String}
  
} ,{collection:'games'});

const Game = model('Game',gameSchema)

module.exports = Game;