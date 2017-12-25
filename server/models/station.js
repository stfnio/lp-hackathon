const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  rewardPoints: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Station', StationSchema);