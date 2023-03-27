const ExpenseModel = require("../models/Expense");

const createExpense = async (req, res, next) => {
  const { name, description, amount, categoryId } = req.body;
  try {
    if (!amount || !description || !categoryId || !name) {
      res.status(400).json({
        status: false,
        message: "Please fill all fields",
      })
    }
    const expense = await ExpenseModel.create({
      name,
      description,
      amount,
      categoryId,
      userId: req.user.id,
    });
    if (expense) {
      return res.status(201).json({
        status: true,
        message: "New expense added successfully"
      })
    }
    return res.status(400).json({
      status: false,
      message: "Failed to add expense"
    })
  } catch (error) {
    next(error);
  }
};
const getExpenses = async (req, res, next) => {
  try {
    const expenses = await ExpenseModel.find({ userId: req.user.id }).populate('categoryId');
    if (expenses) {
      return res.status(200).json({
        status: true,
        data: expenses,
        message: "Expenses fetched successfully"
      })
    }
    return res.status(400).json({
      status: false,
      message: "Failed to feetch expenses"
    })
  } catch (error) {
    next(error);
  }
};
const getExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseModel.find({ userId: req.user.id, _id: id }).populate('categoryId');
    if (expense) {
      return res.status(200).json({
        status: true,
        data: expense,
        message: "Expense fetched successfully"
      })
    }
    return res.status(400).json({
      status: false,
      message: "Failed to feetch expense"
    })
  } catch (error) {
    next(error);
  }
};
const deleteExpense = async (req, res, next) => { };

module.exports = {
  createExpense,
  getExpense,
  getExpenses,
  deleteExpense,
};