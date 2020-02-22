const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const { notFound, errorHandler } = require('./middlewares');
const logs = require('./api/logs');

const app = express();

// Need mongod to be running on the machine
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
// Make server be able to recieve json
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello!',
  });
});

app.use('/api/logs', logs);

// Middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
