const express = require("express");
const router = express.Router();
const fs = require("fs");
const utility = require("../jsmodules/utility");
/* GET create page. */
router.get("/", function(req, res) {
	let files = fs.readdirSync(__dirname + "/../public/maps", {
		withFileTypes: false
	});
	res.setHeader("Content-Type", "application/json");
	for (let i = 0; i < files.length; i++) {
		files[i] = utility.readMapFile(files[i]);
	}
	console.log(files);
	res.end(JSON.stringify(files));
});

module.exports = router;
