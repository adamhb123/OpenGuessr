const express = require('express');
const router = express.Router();
const fs = require('fs');
const utility = require("../utility");
/* GET create page. */
router.get('/', function(req, res, next) {
  let files = fs.readdirSync(__dirname+ "/../public/portals", {withFileTypes: false });
  res.setHeader('Content-Type', 'application/json');
  for(let i = 0; i < files.length; i++){
    let ft = utility.getPortalImageFileType(__dirname+ "/../public/portals/"+files[i]);
    files[i] = files[i].split('.');
    files[i] = files[i].slice(0,files[i].length-1).join();
    files[i] = files[i]+ft;
  }
  console.log(files);
  res.end(JSON.stringify(files));
});

module.exports = router;
