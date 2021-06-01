//  Tests for Server IO Operations
const utility = require("../jsmodules/utility");
const fs = require("fs");

function testFileExists() {
	return utility.fileExists("ServerIO.js");
}

function testWriteMapFile() {
	//  Here we use dummy representations of the jsonified map and portal objects
	//  You wouldn"t see these marker values in an actual portal, of course
	return new Promise((resolve, reject) => {
		utility.writeMapFile("./mapwritetest.map", {
			name: "Tester Map",
			uuid: 123456,
			links: [],
			portals: [{
				uuid: 56,
				image: "testportal.jpg",
				markers: [
					[
						[0, 0],
						[1, 1],
						[2, 2],
						[4, 3]
					],
					[
						[5, 5],
						[2, 3],
						[-1, 1],
						[2, 2]
					]
				]
			}]
		});
		let check = fs.readFileSync("./mapwritetest.map");
		if (check == JSON.stringify({"name":"Tester Map","uuid":123456,"portals":[{"uuid":56,"image":"testportal.jpg","markers":[[[0,0],[1,1],[2,2],[4,3]],[[5,5],[2,3],[-1,1],[2,2]]]}]})){
			resolve("Test successful");
		} else{
			reject("Test failed");
		}
	});

}

function testReadMapFile() {
	return new Promise((resolve, reject) => {
		if (!utility.fileExists("mapreadtest.map")) {
			if (!testWriteMapFile()) reject("Failed to write map file, test failed");
		}
		utility.readMapFile("mapreadtest.map").then(data => resolve(JSON.stringify(data) == JSON.stringify({"name":"Tester Map","uuid":123456,"portals":[{"uuid":56,"image":"testportal.jpg","markers":[[[0,0],[1,1],[2,2],[4,3]],[[5,5],[2,3],[-1,1],[2,2]]]}]})));
		resolve("Test successful");
	});
}

function runAllTests() {
	console.log(`Test fileExists: ${testFileExists()}`);
	testWriteMapFile().then(result => console.log(`Test writeMapFile: ${result}`));
	testReadMapFile().then(result => console.log(`Test readMapFile: ${result}`));
}

runAllTests();
