const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { notFound, errorHandler } = require('./middlewares');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'https://localhost:3000',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello!',
  });
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
