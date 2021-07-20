const express = require("express");
const router = express.Router();

/* GET play page. */
router.get("/", function (req, res) {
	res.render("play", {title: "OpenGuessr"});
});

module.exports = router;
