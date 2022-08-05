const express = require('express');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const cors = require('cors');
const helmet = require('helmet');

const { PORT } = require('./env');
const authRoute = require('./src/route/auth.route');

const app = express();

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
);

app.use(
  cors({
    origin: '*'
  })
);
app.use(bodyParser.json());
app.use(xss());

app.get('/', (req, res) => {
  res.send('Welcome to API');
});

app.use(authRoute);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'API Not Found, Please make sure you are using the correct URL'
  });
});

app.listen(PORT, () => console.log(`service running on PORT ${PORT}`));
