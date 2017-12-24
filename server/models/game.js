const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Loyalty plant | New Year Game"
  },
  isStarted: {
    type: Boolean,
    required: true,
    default: false,
  },
  groups: [
    {
      type: Schema.ObjectId,
      ref: 'Group'
    }
  ]
})

module.exports = mongoose.model('Game', GameSchema);