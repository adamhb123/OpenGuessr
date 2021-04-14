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
  writeLocFile : function (filename, imageFilename, markers){
    return new Promise((resolve, reject) => {
    //fs.readFile(__dirname + "/../public" + uploaded_images_location + passedVariable, function(err, data) {
    fs.readFile(imageFilename, function(err, dataw) {
      if (err) reject(err);
        // Encode to base64
        // let encodedImage = Buffer.from(data, 'binary').toString('base64');
        let imspl = imageFilename.split('.');
        const data = `${JSON.stringify(markers)}!@!.${imspl[imspl.length-1]}`;
        //fs.writeFile(__dirname + "/../public" + uploaded_portals_location + filename,encodedImage, function (err,data) {\
        fs.writeFile(filename, data, function(errw, dataWrite) {
          if (errw) reject(errw);
        });
      });
    });
  },
  readLocFile : function(filename){
    return new Promise((resolve, reject) => {
      fs.readFile(filename, function(err, data){
        if(err) reject(err);
        data = data.toString();
        //data = data.split('!@!');
        //console.log(data);
        resolve(data);
      });
    });
  },
  getPortalImageFileType : function(filename){
    let data = fs.readFileSync(filename);
    data = data.toString().split('!@!');
    return data[1];
  },
}
