const { Schema, model } = require('mongoose');
const chartSchema = new Schema({
    _id: { type: Number },
    totalAmount: { type: Number }

}, { collection: 'chart_recommendation' });

const Chart = model('Recomendations', chartSchema)

module.exports = Chart;