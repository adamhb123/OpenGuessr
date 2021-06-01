const express = require("express");
const router = express.Router();
const utility = require("../jsmodules/utility");


router.post("/", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let mapFilename = req.body.mapFilename.toString();
  let type = req.body.type.toString();
  if (type == "get map portals") {
    utility.readMapFile(`${__dirname}/../public/maps/${mapFilename}`).then(map => {
      return res.end(JSON.stringify(map.portals));
    }).catch(() => {
      return res.status(400).send({
        message: "Malformed request"
      });
    });
  }
  else if(type == "get portal image"){
    let portalUUID = req.body.portalUUID.toString();
    utility.getPortalImageFile(`${__dirname}/../public/maps/${mapFilename}`, portalUUID).then(image => {
      console.log(image);
      return res.end(JSON.stringify({portalImage: image}));
    }).catch(() => {
      return res.status(400).send({
        message: "Malformed request"
      });
    });
  }
});

module.exports = router;
