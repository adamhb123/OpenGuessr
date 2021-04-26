const fs = require('fs');
function _dataListToSaveString(dataList){
  let fnStr = "";
  for(let i = 0; i < dataList.length; i++){
    if(i == dataList.length-1) fnStr += dataList[i];
    else fnStr += dataList[i] + "!@!";
  }
  return fnStr;
}
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
      let data = _dataListToSaveString([JSON.stringify(markers), imageFilename]);
      fs.writeFile(filename, data, function(errw, dataWrite) {
        if (errw) reject(errw);
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
  getPortalImageFile : function(portalFilename){
    console.log("PORTAL: " + portalFilename);
    let data = fs.readFileSync(portalFilename);
    data = data.toString().split('!@!');
    return data[1];
  },
}
