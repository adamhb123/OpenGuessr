const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const {v4: uuidv4} = require("uuid");
const portals = require("../serverside/portals");
/* GET create page. */
router.get("/", function (req, res) {
	portals.getAllMaps().then(maps => {
		console.log("Retrieved maps: " + JSON.stringify(maps));
		res.render("upload", {
			title: "OpenGuessr",
			maps: maps
		});
	});
});
router.post("/", function (req, res) {
	let fstream;
	let file = req.files["file-uploaded"];
	let filename = file.name;
	let fnspl = filename.split(".");
	let newFilename = uuidv4().replace(".", "") + "." + fnspl[fnspl.length - 1];
	let mapUUID = req.body.map;
	new Promise((resolve, reject) => {
		console.log("mapUUID: " + mapUUID);
		if (mapUUID === "new-map") {
			let map = {
				name: req.body["new-map-name"],
				uuid: uuidv4().replace(".", ""),
				links: [],
				portals: []
			};
			portals.writeMapFile(map).then(
				map => resolve(map)
			).catch(
				err => reject(`Malformed POST body:\n\t${err}`)
			);
		} else {
			portals.readMapFile(mapUUID).then(
				map => resolve(map)
			).catch(
				err => reject(`Malformed POST body:\n\t${err}`)
			);
		}
	}).then(map => {
		console.log(`Uploading ${filename} as ${newFilename}`);
		// Path where image will be uploaded
		fstream = fs.createWriteStream(`${__dirname}/../public/images/panoramas/${newFilename}`);
		fstream.write(file.data, () => {
			console.log(`Upload Finished of ${filename}(${newFilename})`);
			res.redirect(`editor?image=${encodeURIComponent(newFilename)}&map=${encodeURIComponent(map.uuid)}`);
			fstream.end();
		});
	}).catch((err) => {
		console.error("Error: " + err);
	});

});
module.exports = router;
