const express = require('express');
const router = express.Router();
const fs = require("fs");
const uploadedImagesLocation = "/images/panoramas/";
const uploadedPortalsLocation = "/portals/";
const pubdir = __dirname + "/../public";
const utility = require("../jsmodules/utility");

function polygonRadToString(polygonRad) {
  strng = "";
  for (let i = 0; i < polygonRad.length; i++) {
    strng += '[';
    for (let j = 0; j < polygonRad[i].length; j++) {
      strng += polygonRad[i][j].toString();
      strng += j != polygonRad[i].length - 1 ? ',' : '';
    }
    strng += "]";
    strng += i != polygonRad.length - 1 ? ',\n' : '';
  }
  return strng;
}

/* GET home page. */
let ref = null;
let portalImage = null;
let portalMap = null;

router.get('/', function(req, res, next) {
  portalImage = req.query.image;
  portalMap = req.query.map;
  res.render('editor', {
    title: 'OpenGuessr',
    panorama: uploadedImagesLocation + portalImage,
    mapUUID: portalMap
  });
});
router.post('/', function(req, res, next) {
  console.log("POST RECEIVED")
  let type = req.body.type.toString();

  if(type.includes("finalize portal")) {
    //let filename = portalImage.split('.')[0] + ".prtl";
    console.log(`${pubdir}/maps/${portalMap}`);
    utility.addPortalToMapFile(`${pubdir}/maps/${portalMap}`, {
      uuid: utility.createUUID(),
      image: portalImage,
      markers: req.body.markers
    });
    /*utility.writeLocFile(`${pubdir}${uploadedPortalsLocation}${filename}`,
      `${portalImage}`,
      markers,
    ).then(() => {
      utility.readLocFile(`${pubdir}${uploadedPortalsLocation}${filename}`);
    });*/
  } else if (type.includes("return portal")) {
    console.log("Returning portal");
  }
  res.end("bruh");
});

module.exports = router;
