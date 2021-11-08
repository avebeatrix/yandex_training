/* A. Префиксные суммы */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}

	let [n, q] = parse_ints(data[0]);
	let arr = parse_ints(data[1]);
	let sums = [0];
	let sum = 0;
	let result = [];
	arr.forEach((element, i) => {
		sum += element;
		sums[i+1] = sum;
	});
	for (let i = 2; i < q + 2; i++) {
		let [left, right] = parse_ints(data[i]);
		result.push(sums[right]-sums[left-1]);
	}
	return result.join('\n');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());