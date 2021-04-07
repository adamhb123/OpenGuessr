const express = require('express');
const router = express.Router();
const fs = require("fs");

const uploaded_images_location = "/images/panoramas/";
const uploaded_portals_location = "/portals/";
const pubdir = __dirname + "/../public";

var passedVariable = null;

function polygonRadToString(polygonRad){
    strng = "";
    for(let i = 0; i < polygonRad.length; i++){
      strng += '[';
      for(let j = 0; j < polygonRad[i].length; j++){
        strng += polygonRad[i][j].toString();
        strng += j != polygonRad[i].length-1 ? ',' : '';
      }
      strng += "]";
      strng += i != polygonRad.length-1 ? ',\n' : '';
    }
    return strng;
}
function writeLocFile(filename, imageFilename, polygonRad){
  //fs.readFile(__dirname + "/../public" + uploaded_images_location + passedVariable, function(err, data) {
  fs.readFile(imageFilename, function(err, data) {
    if (err) throw err;
    // Encode to base64
    let encodedImage = Buffer.from(data, 'binary').toString('base64');
    //fs.writeFile(__dirname + "/../public" + uploaded_portals_location + filename,encodedImage, function (err,data) {\
    fs.writeFile(filename, encodedImage, function(err, dataWrite) {
      if (err) throw err;
      let imspl = imageFilename.split('.');
      const appendee = "!@!"+JSON.stringify(polygonRad)+"!@!."+imspl[imspl.length-1];
      console.log(appendee);
      fs.appendFile(filename, appendee, function (err,dataApp) {
        if (err) {
          return console.log(err);
        }
        console.log(dataApp);
      });
    });
  });
}
function readLocFile(filename){
  fs.readFile(filename, function(err, data){
    if(err) throw err;
    data = data.toString().split('!@!');
    fs.writeFileSync("./img"+data[2], Buffer.from(data[0], 'base64'));
    let polygonRad = JSON.parse(data[1]);
    console.log(polygonRad);
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  passedVariable = req.query.image;
  console.log(passedVariable);
  res.render('editor', { title: 'CSHGuessr', panorama: uploaded_images_location + passedVariable});
}).post('/', function(req, res, next){
  console.log("POST RECEIVED")
  if(passedVariable != null){
    let filename = passedVariable.split('.')[0] + ".prtl";
    let polygonRad = req.body.polygonRad;
    console.log("Writing");
    writeLocFile(pubdir + uploaded_portals_location + filename,
                 pubdir + uploaded_images_location + passedVariable,
                 polygonRad);
    console.log("written");
    readLocFile(pubdir + uploaded_portals_location + filename);
    };
  }
);

module.exports = router;
