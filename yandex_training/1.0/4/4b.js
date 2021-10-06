/*

B. Номер появления слова

*/

let getNumbers = data => {
	let words = data.toString().trim().split(/\s+/).map(input => input.toString()).filter(input => input != '')
	let dict_all = [];
	let numbers = [];
	for (i = 0; i < words.length; i++) {
		dict_all[words[i]] = 0;
	}
	for (i = 0; i < words.length; i++) {
		numbers.push(dict_all[words[i]]);
		dict_all[words[i]] += 1;
	}

	if (numbers.length == 0) return '';
	return numbers.join(' ');
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString()

const result = getNumbers(data)

fs.writeFileSync("output.txt", result.toString())