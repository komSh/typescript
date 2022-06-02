const express = require('express');


const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// CONSTANTS
dotenv.config();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json({ limit: '50mb' })); // to return files as json
app.use(cors()); // for cross origin  files
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use('/api', require('./routes/auth'));

app.get('/', async (req, res, next) => {

  res.send('Hello World');
});
// SERVER PORT
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
