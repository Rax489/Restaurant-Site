const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Images'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname); // File name
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('srcImage'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const imageUrl = req.file.path; 

    const { name, category, price, desc } = req.body;
    
    const newDish = await dishController.createDish({
      name,
      category,
      price,
      desc,
      imageUrl
    });

    res.status(201).json(newDish);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const dishes = await dishController.getDishes();
    res.json(dishes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const dish = await dishController.getDishById(req.params.id);
    if (!dish) {
      res.status(404).json({ message: 'Dish not found' });
      return;
    }
    res.json(dish);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', upload.single('srcImage') ,async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const imageUrl = req.file.path; 

    const { name, category, price, desc } = req.body;
    
    const newDish  = {
      name,
      category,
      price,
      desc,
      imageUrl
    }

    const updatedDish = dishController.updateDish(req.params.id, newDish);
    res.json(updatedDish);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedDish = await dishController.deleteDish(req.params.id);
    res.json(deletedDish);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const deletedDishes = await dishController.clearDishes();
    res.json(deletedDishes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
