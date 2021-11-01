/* D. Лавочки в атриуме */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}

	let [L, K] = parse_ints(data[0]);
	let blocks = parse_ints(data[1]);

	let left_candidate = 0;
	for (let i = 0; i < K; i++) {
		if (blocks[i] < Math.floor(L / 2)) {
			left_candidate = blocks[i];
		} else if (blocks[i] === (Math.floor(L / 2) || 1) && L % 2 === 1) {
			return blocks[i];
		} else {
			return left_candidate + ' ' + blocks[i];
		}
	}
}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());