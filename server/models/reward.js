const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RewardSchema = new Schema({
    id: {type: Number, required: true},
    price: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    picture: {type: String, required: true}
})

module.exports = mongoose.model('Reward', RewardSchema);