const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

router.post('/', async (req, res, next) => {
    try {
        const newPhoto = await galleryController.createPhoto(req.body);
        res.status(201).json(newPhoto);
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

router.put('/:id', async (req, res, next) => {
    try {
        const updatedPhoto = await galleryController.updatePhoto(req.params.id, req.body);
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