const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  operationType: {
    type: String,
    required: true,
    enum: ['Accrual', 'Debit']
  },
  amount: {
    type: Number,
    required: true
  },
  reward: {
    type: Schema.ObjectId,
    ref: 'Reward'
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
