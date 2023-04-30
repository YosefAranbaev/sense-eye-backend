const { Schema, model } = require('mongoose');
const recSchema = new Schema({
    status: { type: Number },
    frame: {type : String      },
    orgName: { type: String },
    gameID: { type: String }

}, { collection: 'recomendations' });

const Rec = model('Recomendations', recSchema)

module.exports = Rec;