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

router.put('/:id', upload.single('srcImage') ,async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const imageUrl = req.file.path; 

    const { name, desc } = req.body;
    
    const newService = {
      name,
      desc,
      imageUrl
    };

    console.log(newService)

    const updatedService = serviceController.updateService(req.params.id, newService);
    res.json(updatedService);
  } catch (error) {
    next(error);
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
