const express = require("express");
const router = express.Router();
const utility = require("../jsmodules/utility");

function getRandomPortalImageFile(req, res){
	utility.getRandomPortalImageFile().then(panorama => res.end(JSON.stringify({
		portalImage: panorama
	}))).catch(error => {
    return res.status(400).send({
      message: error
    });
  });
}

function getMapPortals(req, res) {
	let mapUUID = req.body.mapUUID.toString();
  utility.readMapFile(mapUUID).then(map => {
    return res.end(JSON.stringify(map.portals));
  }).catch(error => {
    return res.status(400).send({
      message: error
    });
  });
}
function getPortalImage(req, res){
	let mapUUID = req.body.mapUUID.toString();
	console.log("GET PORTAL IMAGE BODY: " + req.body.toString());
	let portalUUID = req.body.portalUUID.toString();
	utility.getPortalImageFile(mapUUID, portalUUID).then(image => {
		return res.end(JSON.stringify({
			portalImage: image
		}));
	}).catch(error => {
		return res.status(400).send({
			message: error
		});
	});
}

router.post("/", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let type = req.body.type.toString();
  if (type == "get map portals") {
		return getMapPortals(req, res);
  } else if (type == "get portal image") {
		return getPortalImage(req, res);
  } else if (type == "get random panorama"){
		return getRandomPortalImageFile(req, res);
	}
});

module.exports = router;
