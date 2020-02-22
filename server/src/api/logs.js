const { Router } = require('express');

const router = Router();

// Logs is just the places you were and it doesn't have anything to do with logging info or smth
// Travel log

// Put simply log entry is an entry for review of the place
// Technically this is a model for creating "documents"
const LogEntryModel = require('../models/LogEntryModel');

router.get('/', async (req, res, next) => {
  try {
    // find is a "prototype method" of logEntry
    // It returns all entries created like that:
    // const logEntry = new LogEntryModel(req.body);
    // const createdEntry = await logEntry.save();
    const entries = await LogEntryModel.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // Creating document (entry) locally
    const logEntry = new LogEntryModel(req.body);
    // Saving document in database
    const createdEntry = await logEntry.save();
    // Response back with the saved modified data
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
