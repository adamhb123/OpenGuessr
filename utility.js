const fs = require('fs');
module.exports = {
  fileExists : function (fp){
    console.log("FP " + fp);
    try {
      fs.accessSync(fp, fs.constants.R_OK);
    } catch(err){
      return false;
    }
    return true;
  },
  writeLocFile : function (filename, imageFilename, polygonRads, markerIdLink){
    return new Promise((resolve, reject) => {
    //fs.readFile(__dirname + "/../public" + uploaded_images_location + passedVariable, function(err, data) {
    fs.readFile(imageFilename, function(err, data) {
      if (err) reject(err);
        // Encode to base64
        let encodedImage = Buffer.from(data, 'binary').toString('base64');
        //fs.writeFile(__dirname + "/../public" + uploaded_portals_location + filename,encodedImage, function (err,data) {\
        fs.writeFile(filename, encodedImage, function(errw, dataWrite) {
          if (errw) reject(errw);
          let imspl = imageFilename.split('.');
          const appendee = ("!@!"+JSON.stringify(polygonRads)+"!@!" + "."+
          imspl[imspl.length-1] + "!@!" + JSON.stringify(markerIdLink));
          console.log(appendee);
          fs.appendFile(filename, appendee, function (err,dataApp) {
            if (err) reject(err);
            console.log(dataApp);
            resolve();
            /*fs.unlink(filename+".lock", (err)=>{
              console.log(err);
            });*/
          });
        });
      });
    });
  },
  readLocFile : function(filename){
    fs.readFile(filename, function(err, data){
      if(err) throw err;
      data = data.toString().split('!@!');
      console.log(data);
      let polygonRads = JSON.parse(data[1]);
      let markerIdLink = JSON.parse(data[3]);
      fs.writeFile("./img"+data[2], Buffer.from(data[0], 'base64'), function(err, cbdat){
        console.log(polygonRads);
        console.log(markerIdLink);
      });
    });
  },
  getPortalImage : function(filename){
    let data = fs.readFileSync(filename);
    data = data.toString().split('!@!');
    return data[0];
  },
  getPortalImageFileType : function(filename){
    let data = fs.readFileSync(filename);
    data = data.toString().split('!@!');
    return data[2];
  },
}
