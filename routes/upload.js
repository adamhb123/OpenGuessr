const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
/* GET create page. */
router.get('/', function(req, res, next) {
  res.render('upload', { title: 'CSHGuessr' });
});
router.post('/', function(req, res){
  var fstream;
  req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/../public/images/panoramas/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('editor?image='+encodeURIComponent(filename));
            });
        });
})

module.exports = router;
