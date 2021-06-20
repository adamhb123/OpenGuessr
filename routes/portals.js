const express = require("express");
const router = express.Router();
const utility = require("../jsmodules/utility");


router.post("/", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	let mapUUID = req.body.mapUUID.toString();
	let type = req.body.type.toString();
	if (type == "get map portals") {
		utility.readMapFile(mapUUID).then(map => {
			return res.end(JSON.stringify(map.portals));
		}).catch(() => {
			return res.status(400).send({
				message: "Malformed request"
			});
		});
	}
	else if(type == "get portal image"){
		console.log("GET PORTAL IMAGE BODY: "+req.body.toString());
		let portalUUID = req.body.portalUUID.toString();
		utility.getPortalImageFile(mapUUID, portalUUID).then(image => {
			return res.end(JSON.stringify({portalImage: image}));
		}).catch(() => {
			return res.status(400).send({
				message: "Malformed request"
			});
		});
	}
});

module.exports = router;
