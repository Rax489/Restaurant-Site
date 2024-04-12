const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', async (req, res, next) => {
    try {
        const newEmployee = await employeeController.createEmployee(req.body);
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

router.put('/:id', async (req, res, next) => {
    try {
        const updatedEmployee = await employeeController.updateEmployee(req.params.id, req.body);
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