//	If POSTCodes is changed here, it needs to be changed in /public/constants.mjs too
module.exports = {
	POSTCodes : {
		FINALIZEPORTAL: 0,
		RETURNPORTAL: 1,	// Unnecessary?
		GETMAPPORTALS: 2,
		GETPORTALIMAGE: 3,
		GETRANDOMPORTALIMAGEFILE: 4
	},
	pubDir: `${__dirname}/../public`
};