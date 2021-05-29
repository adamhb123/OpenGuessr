const express = require("express");
const router = express.Router();
const utility = require("../jsmodules/utility");
router.post("/", function(req, res) {
	if(Object.prototype.hasOwnProperty.call(req.body,"mapUUID")){
		let mapUUID = req.body.mapUUID;
		console.log(mapUUID);
		utility.readMapFile(__dirname + "/../public/maps/" + mapUUID).then(map => {
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify(map.portals));
		});
	}
	else{
		res.end("Bad call");
	}
});

module.exports = router;
