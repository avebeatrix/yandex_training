/*

G. Черепахи

*/

function getResult(data) {
	let length = parseInt(data[0].trim());
	let trueSet = new Set();
	for (let i = 1; i <= length; i++) {
		let [a, b] = data[i].trim().split(' ').map(input => parseInt(input));
		if (a > -0 && b >= 0 && a + b == length - 1) {
			trueSet.add(a + ' ' + b);
		}
	}

	return trueSet.size;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
let data = fileContent.toString().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());