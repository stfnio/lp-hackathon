const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    {
      type: Schema.ObjectId,
      ref: 'User'
    }
  ]
})

module.exports = mongoose.model('Group', GroupSchema);