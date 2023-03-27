const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const AuthMiddleware = require("../middlewares/Auth.middleware");

router.post('/', AuthMiddleware.isAuthorised, CategoryController.createCategory);
router.put('/', AuthMiddleware.isAuthorised, CategoryController.updateCategory);
router.get('/', AuthMiddleware.isAuthorised, CategoryController.getAllCategoryList);
router.get('/:categoryId', AuthMiddleware.isAuthorised, CategoryController.getCategoryByID);
router.delete('/:categoryId', AuthMiddleware.isAuthorised, CategoryController.deleteCategory);

module.exports = router;