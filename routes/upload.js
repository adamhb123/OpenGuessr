const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const {
  v4: uuidv4
} = require("uuid");
const utility = require(`${__dirname}/../jsmodules/utility`);
/* GET create page. */
router.get("/", function(req, res) {
  utility.getAllMaps().then(maps => {
    console.log("Retrieved maps: " + JSON.stringify(maps));
    res.render("upload", {
      title: "OpenGuessr",
      maps: maps
    });
  });
});
router.post("/", function(req, res) {
  var fstream;
  //req.pipe(req.busboy);
  console.log(req.files);
  console.log(req.body);
  let file = req.files["file-uploaded"];
  let filename = file.name;
  let fnspl = filename.split(".");
  let newFilename = uuidv4().replace(".", "") + "." + fnspl[fnspl.length - 1];
  let mapUUID = req.body.map;
  new Promise((resolve, reject) => {
    if (mapUUID == "new-map") {
      let map = {
        name: req.body["new-map-name"],
        uuid: uuidv4().replace(".", ""),
        links: [],
        portals: []
      };
      utility.writeMapFile(`${__dirname}/../public/maps/${map.uuid}.map`, map).then(
        resolve(map)
      );
    } else {
      utility.readMapFile(`${__dirname}/../public/maps/${mapUUID}.map`).then(map => resolve(map));
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
  });

});
module.exports = router;
