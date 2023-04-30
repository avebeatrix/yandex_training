/*

C. Ближайшее число

*/

let nearestNumber = (list, myNumber) => {
	let nearestNumber = list[0];
	let getDiff = (a, b) => {
		if (a > b) return a - b;
		else return b - a;
	}
	let diff = getDiff(list[0], myNumber);
	let currentDiff = diff;

	for (let i = 1; i < list.length; i++) {
		currentDiff = getDiff(list[i], myNumber);
		if (currentDiff < diff) {
			nearestNumber = list[i];
			diff = currentDiff;
		}
	}
	return nearestNumber;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().split("\n");
const list_length = data[0];
const list = data[1].split(" ").map(input => {
	return parseInt(input);
})
const myNumber = data[2];

const result = nearestNumber(list, myNumber);

fs.writeFileSync("output.txt", result.toString());