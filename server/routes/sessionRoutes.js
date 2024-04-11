const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/', async (req, res, next) => {
  try {
    const session = await sessionController.createSession(req.body);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    const session = await sessionController.clearSessions();
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
});


router.get('/', async (req, res, next) => {
  try {
    const sessions = await sessionController.getSessions();
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const session = await sessionController.getSessionById(req.params.id);
    if (!session) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }
    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedSession = await sessionController.deleteSession(req.params.id);
    res.json(deletedSession);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
