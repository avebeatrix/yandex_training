/*

D. Больше своих соседей

*/

let getAmount = (list) => {
	let amount = 0;
	for (let i = 1; i < list.length - 1; i++) {
		if (list[i] > list[i - 1] && list[i] > list[i + 1]) amount++;
	}
	return amount;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const list = fileContent.toString().split(" ").map(input => {
	return parseFloat(input);
});

const result = getAmount(list);

fs.writeFileSync("output.txt", result.toString());