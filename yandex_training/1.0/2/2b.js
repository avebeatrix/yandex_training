/*

B. Определить вид последовательности

*/

let detectType = (list) => {
	let flag_CONSTANT = flag_ASCENDING = flag_WEAKLY_ASCENDING = flag_DESCENDING = flag_WEAKLY_DESCENDING = true;
	let current = list[0];
	for (let i = 1; i < list.length; i++) {
		if (list[i] == -2000000000) {
			break;
		}
		if (list[i] != current) {
			flag_CONSTANT = false;
		}
		if (list[i] < current) {
			flag_ASCENDING = false;
			flag_WEAKLY_ASCENDING = false;
		}
		if (list[i] <= current) {
			flag_ASCENDING = false;
		}
		if (list[i] > current) {
			flag_DESCENDING = false;
			flag_WEAKLY_DESCENDING = false;
		}
		if (list[i] >= current) {
			flag_DESCENDING = false;
		}
		current = list[i];
	}
	if (flag_CONSTANT) return 'CONSTANT';
	else if (flag_ASCENDING) return 'ASCENDING';
	else if (flag_WEAKLY_ASCENDING) return 'WEAKLY ASCENDING';
	else if (flag_DESCENDING) return 'DESCENDING';
	else if (flag_WEAKLY_DESCENDING) return 'WEAKLY DESCENDING';
	else return 'RANDOM';
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const list = fileContent.toString().split("\n").map(input => {
	return parseInt(input);
});

const result = detectType(list);

fs.writeFileSync("output.txt", result.toString());