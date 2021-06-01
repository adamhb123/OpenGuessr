const fs = require("fs");

module.exports = {
  fileExists: (fp) => {
    try {
      fs.accessSync(fp, fs.constants.R_OK);
    } catch (err) {
      return false;
    }
    return true;
  },

  createUUID: () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },

  addPortalToMapFile: (filename, portalJSON) => {
    return new Promise((resolve, reject) => {
      try {
        // let portalData = JSON.stringify(portalJSON);
        if (module.exports.fileExists(filename)) {
          module.exports.readMapFile(filename).then(map => {
            map.portals = map.portals.filter(it => it.uuid !== portalJSON.uuid);
            map.portals.push(portalJSON);
            module.exports.writeMapFile(filename, map);
            resolve(`Portal '${portalJSON.uuid}' successfully added to map '${map.name}'`);
          });
        } else {
          reject(`Map '${filename}' does not exist!`);
        }
      } catch (error) {
        reject(error);
      }

    });
  },

  writeMapFile: (filename, map) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify(map);
      fs.writeFile(filename, data, (err) => {
        try {
          if (err) reject(err);
          resolve(`Map file ${filename} written successfully!`);

        } catch (error) {
          reject(error);
        }
      });
    });
  },

  readMapFile: (filename) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data) => {
        try {
          if (err) reject(err);
          let res = JSON.parse(data.toString());
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    });
  },

  getAllMaps: () => {
    return new Promise((resolve, reject) => {
      const promises = [];
      fs.readdir(`${__dirname}/../public/maps`, (err, data) => {
        try {
          if (err) reject(err);
          let maps = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].endsWith(".map")) {
              promises.push(module.exports.readMapFile(`${__dirname}/../public/maps/${data[i]}`));
            }
          }
          Promise.all(promises).then(results => resolve(results))
        } catch (error) {
          reject(error);
        }
      });
    });
  },

  getPortalImageFile: (mapFilename, portalUUID) => {
    return new Promise((resolve, reject) => {
      module.exports.readMapFile(mapFilename).then(map => {
        console.log(map);
        for (let i = 0; i < map.portals.length; i++) {
          if (map.portals[i].uuid == portalUUID) {
            resolve(map.portals[i].image);
          }
        }
      });
    });
  }
}
