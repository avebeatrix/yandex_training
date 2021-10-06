/*

H. Злые свинки

*/

function getResult(data) {
	let length = parseInt(data[0].trim());
	let setX = new Set();
	for (let i = 1; i <= length; i++) {
		let [x, y] = data[i].trim().split(' ').map(input => parseInt(input));
		setX.add(x);
	}

	return setX.size;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
let data = fileContent.toString().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());