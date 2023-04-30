/*

E. Чемпионат по метанию коровьих лепешек

*/

let getMax = (list) => {
	let result = 1;
	let max = list[0];
	let position = -1;
	let metres = 0;
	let need_compare_candidate = false;
	for (let i = 1; i < list.length - 1; i++) {
		if (list[i - 1] > max) {
			max = list[i - 1];
			position = -1;
			metres = 0;
		}
		if (list[i] % 5 == 0 && list[i] % 10 != 0 && list[i + 1] < list[i] && list[i] > metres) {
			position = [i];
			metres = list[i];
		}

	}
	if (list[list.length - 1] > max || position == -1) return '0';
	for (let i = 0; i < list.length; i++) {
		if (list[i] > list[position]) {
			result++;
		}
	}
	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split("\n");
const list = data[1].split(" ").map(input => {
	return parseInt(input);
});

const result = getMax(list);

fs.writeFileSync("output.txt", result.toString());