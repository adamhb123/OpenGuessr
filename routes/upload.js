const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
/* GET create page. */
router.get('/', function(req, res, next) {
  res.render('upload', { title: 'OpenGuessr' });
});
router.post('/', function(req, res){
  var fstream;
  req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
        let fnspl = filename.split(".");
            let new_filename = uuidv4().replace('.','') + "." + fnspl[fnspl.length-1];
            console.log("Uploading " + filename + " as " + new_filename);
            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/../public/images/panoramas/' + new_filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename + " (" + new_filename + ")");
                res.redirect('editor?image='+encodeURIComponent(new_filename));
            });
        });
});
module.exports = router;
