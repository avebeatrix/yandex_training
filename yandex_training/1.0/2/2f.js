/*

F. Симметричная последовательность

*/

let getSymmetricTail = (list) => {
	let list_length = list.length;
	let result = [];
	for (start = 0; start < list_length; start++) {
		i = start;
		j = list_length - 1;
		while (i < list_length && j >= 0 && list[i] == list[j] && i <= j) {
			i++;
			j--;

		}
		if (i > j) {
			for (let k = start - 1; k > -1; k--) {
				result.push(list[k]);
			}
			return result;
		}

	}
	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split("\n");
let list = [];
if (data[1].toString().trim()) {
	list = data[1].toString().trim().split(" ").map(input => {
		return parseInt(input);
	});
}
const result = getSymmetricTail(list);

fs.writeFileSync("output.txt", result.length + "\n" + result.join(' '));