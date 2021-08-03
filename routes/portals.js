const express = require("express");
const router = express.Router();
const utility = require("../serverside/utility");
const constants = require("../serverside/constants");
const portals = require("../serverside/portals");

function getRandomPortalImageFile(req, res) {
	//	Returns a JSON obj with the portalImage as an attribute
	portals.getAllMaps().then(maps => {
		if (maps.length === 0) res.end("No maps found");
		//	Selects random map
		let map = maps[Math.floor(Math.random() * maps.length)];
		if (map.portals.length === 0) res.end(`No portals in map "${map.name}"(${map.uuid})`);
		let portal = map.portals[Math.floor(Math.random() * map.portals.length)];
		return portal.image;
	}).catch(error => res.end(error)).then(panorama => res.end(JSON.stringify({
		portalImage: panorama
	}))).catch(error => {
		return res.status(400).send({
			message: error
		});
	});
}

function getPortalImage(req, res) {
	let mapUUID = req.body.mapUUID.toString();
	console.log("GET PORTAL IMAGE BODY: " + req.body.toString());
	let portalUUID = req.body.portalUUID.toString();
	portals.getPortalImageFile(mapUUID, portalUUID).then(image => {
		return res.end(JSON.stringify({
			portalImage: image
		}));
	}).catch(error => {
		return res.status(400).send({
			message: error
		});
	});
}


function getMapPortals(req, res) {
	let mapUUID = req.body.mapUUID.toString();
	portals.readMapFile(mapUUID).then(map => {
		return res.end(JSON.stringify(map.portals));
	}).catch(error => {
		return res.status(400).send({
			message: error
		});
	});
}

function finalizePortal(req) {
	let portalImage = req.query.image;
	let portalMapUUID = req.query.map;
	console.log(`${constants.mapDir}/${portalMapUUID}`);
	utility.addPortalToMapFile(`${constants.mapDir}/${portalMapUUID}`, {
		uuid: utility.createUUID(),
		image: portalImage,
		markers: req.body.markers
	}).then(r => console.log(`BFFF: ${r.toString()}`));
}

function returnPortal(req){
	console.log(req);
}

router.post("/", function (req, res) {
	res.setHeader("Content-Type", "application/json");
	let type = Number.parseInt(req.body.type);
	console.log("TYPE: " + req.body.type);
	switch (type) {
	case constants.POSTCodes.FINALIZEPORTAL:
		return finalizePortal(req);
	case constants.POSTCodes.RETURNPORTAL:
		return returnPortal(req);
	case constants.POSTCodes.GETMAPPORTALS:
		return getMapPortals(req, res);
	case constants.POSTCodes.GETPORTALIMAGE:
		return getPortalImage(req, res);
	case constants.POSTCodes.GETRANDOMPORTALIMAGEFILE:
		return getRandomPortalImageFile(req, res);
	}
});


module.exports = router;
