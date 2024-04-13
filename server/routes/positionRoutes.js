const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');

router.post('/', async (req, res, next) => {
  try {
    const newPosition = await positionController.createPosition(req.body);
    res.status(201).json(newPosition);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const categories = await positionController.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const position = await positionController.getPositionById(req.params.id);
    if (!position) {
      res.status(404).json({ message: 'Position not found' });
      return;
    }
    res.json(position);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedPosition = await positionController.updatePosition(req.params.id, req.body);
    res.json(updatedPosition);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPosition = await positionController.deletePosition(req.params.id);
    res.json(deletedPosition);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const deletedCategories = await positionController.clearCategories();
    res.json(deletedCategories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
