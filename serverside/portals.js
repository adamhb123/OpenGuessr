const utility = require("./utility");
const constants = require("./constants");
const fs = require("fs");

module.exports = {

	returnPortal: () => {
		console.log("Returning portal");
	},
	addPortalToMapFile: (mapUUID, portalJSON) => {
		return new Promise((resolve, reject) => {
			try {
				// let portalData = JSON.stringify(portalJSON);
				if (module.exports.fileExists(`${constants.pubDir}/maps/${mapUUID}.map`)) {
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
			fs.writeFile(`${constants.pubDir}/maps/${mapFilename}`, data, (err) => {
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
			fs.readFile(`${constants.pubDir}/maps/${mapUUID}.map`, (err, data) => {
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
			console.log(constants.pubDir);

			fs.readdir(`${constants.pubDir}/maps/`, (err, data) => {
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
					if (map.portals[i].uuid === portalUUID) {
						resolve(map.portals[i].image);
					}
				}
				reject("Couldn't find portal image file");
			});
		});
	}
};