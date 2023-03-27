const express = require("express");
const router = express.Router();
const ExpenseController = require("../controllers/ExpenseController");
const middlewares = require("../middlewares");

router.post("/", middlewares.isAuthorised, ExpenseController.createExpense);
router.get("/", middlewares.isAuthorised, ExpenseController.getExpenses);
router.get("/:id", middlewares.isAuthorised, ExpenseController.getExpense);
router.delete(
  "/:id",
  middlewares.isAuthorised,
  ExpenseController.deleteExpense
);

module.exports = router;