const express = require("express");
const router = express.Router();
const fs = require("fs");
const portals = require("../serverside/portals");
/* GET create page. */
router.get("/", function (req, res) {
	let files = fs.readdirSync(__dirname + "/../public/maps", {
		withFileTypes: false
	});
	res.setHeader("Content-Type", "application/json");
	const maps = [];
	const promises = [];
	for (let i = 0; i < files.length; i++) {
		if (files[i].endsWith(".map")) {
			promises.push(portals.readMapFile(files[i].substring(0, files[i].length - 4)));
		}
	}
	Promise.all(promises).then(results => res.end(JSON.stringify(results)));
});

module.exports = router;
