var express = require('express');
const multer  = require("multer");
var router = express.Router();
const fs = require('fs');
//const bodyParser = require('body-parser');
const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var fileName = '';

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  }/*,
  filename: function(req, file, cb) {
    //fileKey = Math.random() * (18446744073709551615 - 4294967295) + 4294967295;
    cb(null, `${fileKey}`);
  }*/
});

router.use(multer({storage}).single("userfile"));
router.post("/fileDown", function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  let filedata = req.file;
  console.log(filedata.filename);
  console.log(filedata);
  if(!filedata)
    res.send("Ошибка при загрузке файла");
  else
    fileName = filedata.filename;
    res.send(`${fileName}`);

});
/*
router.get(`/uploads/${fileName}`, (req, res, next) => {
  fs.unlinkSync(`./uploads/${fileName}`);
});
*/


module.exports = router;
