/*

E. OpenCalculator

*/

function getResult(data) {
	let active = new Set(data[0].trim().split(' '));
	let numbers = new Set();


	[...data[1].trim()].forEach((value, index) => {
		numbers.add(value);
	})
	let result = 0;
	for (let item of numbers) {
		if (!active.has(item)) {
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