const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

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
    
    const newService = await serviceController.createService({
      name,
      desc,
      imageUrl
    });

    res.status(201).json(newService);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const services = await serviceController.getServices();
    res.json(services);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const service = await serviceController.getServiceById(req.params.id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', upload.single('srcImage'), async (req, res, next) => {
  try {
      const { name, desc } = req.body;
      let imageUrl;

      if (req.file) {
          imageUrl = req.file.path;
      } else {
          const service = await serviceController.getServiceById(req.params.id);
          if (!service) {
              res.status(404).json({ message: 'Service not found' });
              return;
          }
          imageUrl = service.imageUrl;
      }

      const newService = {
          name,
          desc,
          imageUrl
      };

      const updatedService = await serviceController.updateService(req.params.id, newService);
      res.status(200).json(updatedService);
  } catch (error) {
      console.log('Error in PUT /:id:', error);
      res.status(500).json({ message: 'Error updating service' });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedService = await serviceController.deleteService(req.params.id);
    res.json(deletedService);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
