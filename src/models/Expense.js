const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Expense', ExpenseSchema)