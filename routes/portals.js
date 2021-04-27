const express = require('express');
const router = express.Router();
const fs = require('fs');
const utility = require("../jsmodules/utility");
/* GET create page. */
router.get('/', function(req, res, next) {
  if(req.body.)
  let files = fs.readdirSync(__dirname+ "/../public/portals", {withFileTypes: false });
  res.setHeader('Content-Type', 'application/json');
  for(let i = 0; i < files.length; i++){
    files[i] = utility.getPortalImageFile(__dirname+ "/../public/portals/"+files[i]);

  }
  console.log(files);
  res.end(JSON.stringify(files));
});

module.exports = router;
