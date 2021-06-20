const fs = require("fs");
const MAPDIR = `${__dirname}/../public/maps`;

module.exports = {
	fileExists: (fp) => {
		try {
			fs.accessSync(fp, fs.constants.F_OK);
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

	addPortalToMapFile: (mapUUID, portalJSON) => {
		return new Promise((resolve, reject) => {
			try {
				// let portalData = JSON.stringify(portalJSON);
				if (module.exports.fileExists(`${MAPDIR}/${mapUUID}.map`)) {
					module.exports.readMapFile(mapUUID).then(map => {
						map.portals = map.portals.filter(it => it.uuid !== portalJSON.uuid);
						map.portals.push(portalJSON);
						module.exports.writeMapFile(map);
						resolve(`Portal '${portalJSON.uuid}' successfully added to map '${mapUUID}.map'`);
					});
				} else {
					reject(`Map '${mapUUID}.map' does not exist!`);
				}
			} catch (error) {
				reject(error);
			}

		});
	},

	writeMapFile: (map) => {
		return new Promise((resolve, reject) => {
			let data = JSON.stringify(map);
			let mapFilename = `${map.uuid}.map`;
			fs.writeFile(`${MAPDIR}/${mapFilename}`, data, (err) => {
				try {
					if (err) reject(err);
					resolve(`Map file ${mapFilename} written successfully!`);

				} catch (error) {
					reject(error);
				}
			});
		});
	},

	readMapFile: (mapUUID) => {
		return new Promise((resolve, reject) => {
			fs.readFile(`${MAPDIR}/${mapUUID}.map`, (err, data) => {
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
			fs.readdir(MAPDIR, (err, data) => {
				if (err) reject(err);

				// let maps = [];
				for (let i = 0; i < data.length; i++) {
					if (data[i].endsWith(".map")) {
						promises.push(module.exports.readMapFile(data[i].slice(0, data[i].length - 4)));
					}
				}
				Promise.all(promises).then(results => {
					resolve(results);
				});
			});
		});
	},

	getPortalImageFile: (mapUUID, portalUUID) => {
		return new Promise((resolve, reject) => {
			module.exports.readMapFile(mapUUID).then(map => {
				for (let i = 0; i < map.portals.length; i++) {
					console.log(`${map.portals[i].uuid} == ${portalUUID}`);
					if (map.portals[i].uuid == portalUUID) {
						resolve(map.portals[i].image);
					}
				}
				reject("Couldn't find portal image file");
			});
		});
	},
	getRandomPortalImageFile: () => {
		return new Promise((resolve, reject) => {
			module.exports.getAllMaps().then(maps => {
				if(maps.length == 0) reject("No maps found");
				let map = maps[Math.floor(Math.random()*maps.length)];
				if(map.portals.length == 0) reject(`No portals in map "${map.name}"(${map.uuid})`)
				let portal = map.portals[Math.floor(Math.random()*map.portals.length)];
				resolve(portal.image);
			}).catch(error => reject(error));
		});
	}
};
