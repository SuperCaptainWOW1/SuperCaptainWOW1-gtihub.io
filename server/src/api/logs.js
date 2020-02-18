const { Router } = require('express');

const router = Router();

// Logs is just the places you were and it doesn't have anything to do with logging info or smth
// Travel log

// Put simply log entry is an entry for review of the place
const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    console.log(error);
    if (error.name === 'validationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
