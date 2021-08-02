const fs = require("fs");
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
		let dt = new Date().getTime();
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
			let r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
		});
	},

};
