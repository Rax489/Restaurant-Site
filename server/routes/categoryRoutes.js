const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

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

    const { name, desc } = req.body;
    
    const newCategory = await categoryController.createCategory({
      name,
      desc,
      imageUrl
    });

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

router.put('/:id', upload.single('srcImage'), async (req, res, next) => {
  try {
      const { name, description } = req.body;
      let imageUrl;

      if (req.file) {
          imageUrl = req.file.path; 
      } else {
          const existingCategory = await categoryController.getCategoryById(req.params.id);
          if (!existingCategory) {
              return res.status(404).json({ message: 'Category not found' });
          }
          imageUrl = existingCategory.imageUrl;
      }

      const categoryData = {
          name,
          description,
          imageUrl
      };

      const updatedCategory = await categoryController.updateCategory(req.params.id, categoryData);
      res.status(200).json(updatedCategory);
  } catch (error) {
      console.error('Error updating category:', error);
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
