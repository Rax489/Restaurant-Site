const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', async (req, res, next) => {
  try {
    const newCategory = await categoryController.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryController.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await categoryController.getCategoryById(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedCategory = await categoryController.updateCategory(req.params.id, req.body);
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedCategory = await categoryController.deleteCategory(req.params.id);
    res.json(deletedCategory);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const deletedCategories = await categoryController.clearCategories();
    res.json(deletedCategories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
