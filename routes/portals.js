const express = require('express');
const router = express.Router();
const fs = require('fs');
const utility = require("../jsmodules/utility");
router.post('/', function(req, res, next) {
  if(req.body.hasOwnProperty("mapUUID")){
    let mapUUID = req.body.mapUUID;
    console.log(mapUUID);
    utility.readMapFile(__dirname + "/../public/maps/" + mapUUID).then(map => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(map.portals));
    });
  }
  else{
    res.end("sus");
  }
});

module.exports = router;
