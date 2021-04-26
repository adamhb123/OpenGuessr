const express = require('express');
const router = express.Router();
const fs = require("fs");
const uploadedImagesLocation = "/images/panoramas/";
const uploadedPortalsLocation = "/portals/";
const pubdir = __dirname + "/../public";
const utility = require("../jsmodules/utility");

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

/* GET home page. */
var ref = null;
router.get('/', function(req, res, next) {
  passedVariable = req.query.image;
  console.log("BRUH");
  console.log(passedVariable);
  res.render('editor', { title: 'OpenGuessr', panorama: uploadedImagesLocation + passedVariable});
}).post('/', function(req, res, next){
  console.log("POST RECEIVED")
  console.log("TYPE: " + req.body.type);
  if(req.body.type == "finalize portal"){
    if(passedVariable != null){
      let filename = passedVariable.split('.')[0] + ".prtl";
      let markers = req.body.markers;
      console.log(markers);
      console.log(`Writing to file ${filename}`);
      utility.writeLocFile(`${pubdir}${uploadedPortalsLocation}${filename}`,
                   `${passedVariable}`,
                   markers,
                 ).then(()=>{utility.readLocFile(pubdir + uploadedPortalsLocation + filename);});
      console.log("written");
      }
    }
    else if(req.body.type == "return portal"){
      console.log("Returning portal");
    }
  }
);

module.exports = router;
