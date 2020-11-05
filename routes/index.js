var express = require('express');
const multer  = require("multer");
var router = express.Router();
const fs = require('fs');
const op = require('../huffman/operator');
//const bodyParser = require('body-parser');
const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const upload = multer();

router.post("/zip", upload.single("userfile"), function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  let filedata = req.file;
  console.log(req.file);
  if(!filedata)
    res.send("Ошибка при загрузке файла");
  else{
    let jsfile = JSON.parse(fs.readFileSync('routes/data/datafile.json'));
    let buffer = req.file.buffer;
    let text = buffer.toString('hex');
    let zipperUnparsed = op.zip.arrayBackwards(op.zip.nodesIterate(op.zip.firstNodes(text)));
    let replacedText = op.zip.textReplaceByNodes(text, zipperUnparsed);
    let zipper = JSON.stringify(zipperUnparsed.reduce((a, v) => {
      return  a = a + '|' + v.nodeName + '-' + v.huffCode;
    }, ''));
    let fileName = new Buffer.from(8 - replacedText.length%8 + '"' + zipper + '"' + filedata.originalname).toString('base64');
    let fileInfo = {
      userName: `${fileName.substring(0, 24)}`,
      encFileName:`${fileName}`
    };
    jsfile.push(fileInfo);
    let data = JSON.stringify(jsfile);
    fs.writeFileSync('routes/data/datafile.json', data);
    fs.writeFileSync('./public/downloads/' + fileInfo.userName, op.zip.textPrepare(replacedText));
    res.status(200).send(`${fileInfo.userName}`);
  }
});
router.post("/unzip", upload.single("userfile"), function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  let filedata = req.file;
  console.log(req.file);
  if(!filedata)
    res.send("Ошибка при загрузке файла");
  else{
    let jsfile = JSON.parse(fs.readFileSync('routes/data/datafile.json'));
    let buffer = req.file.buffer;
    let fileName = req.file.originalname;
    let encFN = jsfile.find(el => {
      if(el.userName == fileName) {
        console.log('el: ', el);
        return el.encFileName;
      }
    }).encFileName;
    console.log('encFN: ', encFN);
    console.log('buf: ', buffer);
    let result = op.unz(buffer, encFN);
    console.log('Result: ', result);
    var buf = Buffer.from(result[0], 'hex');
    buf.fill(0);
    console.log(buf)
    buf = Buffer.from(result[0], 'hex');
    console.log(buf)
    fs.writeFileSync('./public/downloads/' + result[1], buf);
    res.status(200).send(`${result[1]}`);
  }
});

module.exports = router;
