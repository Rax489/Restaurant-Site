const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/', async (req, res, next) => {
    try {
        console.log(JSON.stringify(req.body));
        const newFeedback = await feedbackController.createFeedback(req.body);
        res.status(201).json(newFeedback);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const feedbacks = await feedbackController.getFeedbacks();
        res.json(feedbacks);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const feedback = await feedbackController.getFeedbackById(req.params.id);
        if (!feedback) {
            res.status(404).json({ message: 'Feedback not found' });
            return;
        }
        res.json(feedback);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedFeedback = await feedbackController.updateFeedback(req.params.id, req.body);
        res.json(updatedFeedback);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedFeedback = await feedbackController.deleteFeedback(req.params.id);
        res.json(deletedFeedback);
    } catch (error) {
        next(error);
    }
});

module.exports = router;