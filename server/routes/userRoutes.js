const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', async (req, res, next) => {
    try {
        const newUser = await userController.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const users = await userController.getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await userController.getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedUser = await userController.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await userController.deleteUser(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        next(error);
    }
});

module.exports = router;