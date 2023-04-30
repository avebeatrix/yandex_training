/*

G. Наибольшее произведение двух чисел

*/

let getMaxProductNumbers = (list) => {
	let a_right = false;
	let b_right = false;
	let a_left = false;
	let b_left = false;
	let list_length = list.length;
	let result = [];
	for (i = 0; i < list_length; i++) {
		if (list[i] > list[a_right] || a_right === false) {
			a_right = i;
		}

		if (list[i] < list[a_left] || a_left === false) {
			a_left = i;
		}
	}
	for (i = 0; i < list_length; i++) {
		if ((b_right === false || list[i] > list[b_right]) && i != a_right && list[i] <= list[a_right]) {
			b_right = i;
		}
		if ((b_left === false || list[i] < list[b_left]) && i != a_left && list[i] >= list[a_left]) {
			b_left = i;
		}
	}
	let product_right = list[a_right] * list[b_right];
	let product_left = list[a_left] * list[b_left];
	if (product_right > product_left) {
		if (list[a_right] < list[b_right]) {
			result.push(list[a_right], list[b_right]);
		} else {
			result.push(list[b_right], list[a_right]);
		}
	} else {
		if (list[a_left] < list[b_left]) {
			result.push(list[a_left], list[b_left]);
		} else {
			result.push(list[b_left], list[a_left]);
		}
	}
	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const list = fileContent.toString().trim().split(" ").map(input => {
	return parseInt(input);
});

const result = getMaxProductNumbers(list);

fs.writeFileSync("output.txt", result.join(' '));