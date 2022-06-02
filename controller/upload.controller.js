const models = require('../models');


const file = models.File;
const e = require('express')
const uploadFile = require("../middleware/upload");

const fs = require('fs');

const encrypt = require('node-file-encrypt');
const path = require("path");

module.exports.upload_file = async (req, res) => {
  
  let filePath = path.join(__dirname, 'uploads/test.png'); // source file path
  let encryptPath = '';
  try{
    let f = new encrypt.FileEncrypt(filePath);
    f.openSourceFile();
    f.encrypt('111111');
    encryptPath = f.encryptFilePath;
    console.log("encrypt sync done");

  }catch(err){
    res.status(500).send({
            message: `Could not upload the file:  ${err}`,
          });

  }
    // try {
    //     res.send(req.body);
    //     return;
    //     await uploadFile(req, res);
    //     if (req.file == undefined) {
    //       return res.status(400).send({ message: "Please upload a file!" });
    //     }
    //     res.status(200).send({
    //       message: "Uploaded the file successfully: " + req.file.originalname,
    //     });
    //   } catch (err) {
    //     res.status(500).send({
    //       message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    //     });
    //   }
};