const express = require('express');


const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require("multer");



// CONSTANTS
dotenv.config();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('ReallySecretKey');
const path = require('path');
const encryptedString = cryptr.encrypt(path.join(__dirname, 'uploads/test.png'));
const decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString);
console.log(decryptedString);
const PORT = process.env.PORT || 3000;

var upload = multer();

app.post('/upload', upload.any(), function (req, res, next) {
  // console.log('body data:', req.body);
  // console.log('files data:', req.files);
 // img = req.files; 
  // const invoice =  file.create({
  //   img 
  // });
  // res.status(200).json({
  //   message: 'Invoice Uploaded!',
  // });
  
  res.send( req.files )
  res.sendStatus(200);
});

// ROUTES
//app.use('/api', require('./routes/auth'));

app.get('/', async (req, res, next) => {

  res.sendfile(__dirname + '/public/index.html');
});
// SERVER PORT
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
