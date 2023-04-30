/*

C. Самое частое слово

*/

let getMostOftenWord = data => {
	let words = data.toString().trim().split(/\s+/).map(input => input.toString()).filter(input => input != '')
	let dict_all = [];
	for (i = 0; i < words.length; i++) {
		if (dict_all[words[i]] === undefined) dict_all[words[i]] = 0;
		dict_all[words[i]]++;
	}
	let max = 0;
	let min_word = false;
	for (let item in dict_all) {
		if (dict_all[item] > max) {
			max = dict_all[item];
		}
	}
	for (i = 0; i < words.length; i++) {
		if (dict_all[words[i]] == max) {
			if (min_word === false) {
				min_word = words[i]
			} else if (min_word > words[i]) {
				min_word = words[i];
			}
		}
	}
	if (min_word === false) return '';

	return min_word;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString()

const result = getMostOftenWord(data)

fs.writeFileSync("output.txt", result.toString())