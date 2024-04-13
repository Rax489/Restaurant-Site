const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

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

    const { name, position, exp } = req.body;
    
    const newEmployee = await employeeController.createEmployee({
      name,
      position,
      exp,
      imageUrl
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
    try {
        const employees = await employeeController.getEmployees();
        res.json(employees);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const employee = await employeeController.getEmployeeById(req.params.id);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.json(employee);
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
  
      const { name, position, exp } = req.body;
      
      const newEmployee = {
        name,
        position,
        exp,
        imageUrl
      };
  
  
      const updatedEmployee = employeeController.updateEmployee(req.params.id, newEmployee);
      res.json(updatedEmployee);
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedEmployee = await employeeController.deleteEmployee(req.params.id);
        res.json(deletedEmployee);
    } catch (error) {
        next(error);
    }
});

module.exports = router;