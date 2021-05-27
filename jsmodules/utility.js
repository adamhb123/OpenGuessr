const fs = require('fs');

module.exports = {
  fileExists: (fp) => {
    console.log("FP " + fp);
    try {
      fs.accessSync(fp, fs.constants.R_OK);
    } catch (err) {
      return false;
    }
    return true;
  },

  createUUID: () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },

  addPortalToMapFile: (filename, portalJSON) => {
    return new Promise((resolve, reject) => {
      let portalData = JSON.stringify(portalJSON);
      if (module.exports.fileExists(filename)) {
        module.exports.readMapFile(filename).then(map=>{
          map.portals.push(portalJSON);
          module.exports.writeMapFile(filename,map);
          resolve(`Portal '${portalJSON.uuid}' successfully added to map '${map.name}'`)
        });
      } else {
        reject(`Map '${filename}' does not exist!`);
      }
    });
  },

  writeMapFile: (filename, map) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify(map);
      fs.writeFile(filename, data, (err, dataRes) => {
        if (err) reject(err);
        resolve(`Map file ${filename} written successfully!`);
      });
    });
  },

  readMapFile: (filename) => {
    console.log(filename);
    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data.toString()));
      });
    });
  },

  getAllMaps: () => {
    return new Promise((resolve, reject) => {
      fs.readdir(`${__dirname}/../public/maps`, (err, data) => {
        if (err) reject(err);
        let maps = [];
        for (let i = 0; i < data.length; i++) {
          module.exports.readMapFile(`${__dirname}/../public/maps/${data[i]}`).then(
            map => {
              maps.push(map);
              if(maps.length == data.length) resolve(maps);
            }
          )
        }
      });
    })
  },

  getPortalImageFile: (mapFilename, portalUUID) => {
    let mapData = fs.readFileSync(mapFilename);
    mapData = JSON.parse(mapData.toString());
    for (let i = 0; i < mapData.portals; i++) {
      if (mapData.portals[i].uuid == portalUUID) {
        return mapData.portals[i].image;
      }
    }
    throw `Couldn't find a portal with uuid ${portalUUID}`;
  }
}
