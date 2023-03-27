const CategoryModel = require('../models/Category');

const createCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({
        status: false,
        message: 'Category name is required'
      })
    }
    const category = new CategoryModel({
      name: categoryName
    })

    const data = await category.save();

    if (data) {
      return res.status(200).json({
        status: true,
        message: 'Category created successfully'
      })
    }
    res.status(400).json({
      status: false,
      message: 'Failed to create category'
    })
  } catch (error) {
    next(error)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({
        status: false,
        message: 'Category name is required'
      })
    }
    const updateObj = {
      name: categoryName
    }

    const category = await CategoryModel.findByIdAndUpdate(categoryId, updateObj)
    if (category) {
      return res.status(200).json({
        status: true,
        message: 'Category updated successfully'
      })
    }
    res.status(400).json({
      status: false,
      message: 'Failed to update category'
    })
  } catch (error) {
    next(error)
  }
}

const getAllCategoryList = async (req, res, next) => {
  try {
    const categoryList = await CategoryModel.find({ isActive: true });
    if (categoryList) {
      return res.status(200).json({
        status: true,
        data: categoryList,
        message: 'Category list fetched successfully'
      })
    }
    res.status(400).json({
      status: false,
      message: 'Failed to get category list'
    })
  } catch (error) {
    next(error)
  }
}

const getCategoryByID = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const categoryList = await CategoryModel.findById(categoryId);
    if (categoryList) {
      return res.status(200).json({
        status: true,
        data: categoryList,
        message: 'Category details fetched successfully'
      })
    }
    res.status(400).json({
      status: false,
      message: 'Failed to get category list'
    })
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const categoryList = await CategoryModel.findByIdAndDelete(categoryId);
    if (categoryList) {
      return res.status(200).json({
        status: true,
        message: 'Category deleted successfully'
      })
    }
    res.status(400).json({
      status: false,
      message: 'Failed to delete category list'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCategory,
  updateCategory,
  getCategoryByID,
  getAllCategoryList,
  deleteCategory
}