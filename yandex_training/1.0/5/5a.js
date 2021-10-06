/*

A. Стильная одежда

*/


let getPair = data => {
	let count_top = parseInt(data[0]);
	let tops = data[1].split(' ').map(input => parseInt(input));
	let count_bottom = parseInt(data[2]);
	let bottoms = data[3].split(' ').map(input => parseInt(input));
	let top_pointer = 0;
	let bottom_pointer = 0;
	let result = '';
	let diff = tops[count_top - 1] > bottoms[count_bottom - 1] ? tops[count_top - 1] : bottoms[count_bottom - 1];
	while (top_pointer < count_top && bottom_pointer < count_bottom) {
		let current_diff = -1;
		let ctp = top_pointer;
		let cbp = bottom_pointer;
		if (tops[top_pointer] < bottoms[bottom_pointer]) {
			current_diff = bottoms[bottom_pointer] - tops[top_pointer];
			top_pointer++;
		} else {
			current_diff = tops[top_pointer] - bottoms[bottom_pointer];
			bottom_pointer++;
		}
		if (current_diff < diff) {
			diff = current_diff;
			result = tops[ctp] + ' ' + bottoms[cbp]
		}
	}

	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getPair(data)

fs.writeFileSync("output.txt", result.toString())