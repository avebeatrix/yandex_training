/*

F. Инопланетный геном

*/

function getResult(data) {
	let first = [...data[0].trim()];
	let second = [...data[1].trim()];
	let secondSet = new Set();
	let result = 0;
	for (i = 1; i < second.length; i++) {
		secondSet.add(second[i - 1] + second[i]);
	}
	for (i = 1; i < first.length; i++) {
		if (secondSet.has(first[i - 1] + first[i])) {
			result++;
		}
	}

	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
let data = fileContent.toString().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());