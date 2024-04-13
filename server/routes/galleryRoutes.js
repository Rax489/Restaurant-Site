const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

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

    const { name } = req.body;
    
    const newService = await galleryController.createPhoto({
      name,
      imageUrl
    });

    res.status(201).json(newService);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
    try {
        const photos = await galleryController.getPhotos();
        res.json(photos);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const photo = await galleryController.getPhotoById(req.params.id);
        if (!photo) {
            res.status(404).json({ message: 'Photo not found' });
            return;
        }
        res.json(photo);
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
  
      const { name } = req.body;
      
      const newPhoto = {
        name,
        imageUrl
      };
  
  
      const updatedPhoto = galleryController.updatePhoto(req.params.id, newPhoto);
      res.json(updatedPhoto);
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedPhoto = await galleryController.deletePhoto(req.params.id);
        res.json(deletedPhoto);
    } catch (error) {
        next(error);
    }
});

module.exports = router;