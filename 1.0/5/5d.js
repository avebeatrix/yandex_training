/*

D. Город Че

*/

let getResult = data => {
	let [n, r] = data[0].trim().split(' ').map(input => parseInt(input));
	let items = data[1].trim().split(' ').map(input => parseInt(input));
	let result = 0;
	let summator = 0;
	let pointer = 0;
	for (let i = 1; i < n; i++) {
		summator += items[i] - items[i - 1];
		while (summator > r) {
			result += n - i;
			summator -= items[pointer + 1] - items[pointer];
			pointer++;
		}
	}

	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())