const mongoose = require('mongoose');

const { Schema } = mongoose;

// * Title - Text
// * Description - Text
// * Comments - Text
// * Rating - scale of 1 - 10
// * Image - Text - URL
// * Latitude - Number
// * Longitude - Number
// * Created At - DateTime
// * Updated At - DateTime

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    type: Date,
    reqiured: true,
  },
}, {
  timestamps: true,
});

const logEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = logEntry;
