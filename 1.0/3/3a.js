/*

A. Количество различных чисел

*/

let getCounter = (list) => {
	let resultSet = new Set();
	let current;
	for (let i = 0; i < list.length; i++) {
		current = list[i];
		if (!resultSet.has(list)) {
			resultSet.add(current);
		}
	}
	return resultSet.size;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const list = fileContent.toString().trim().split(" ");

const result = getCounter(list);

fs.writeFileSync("output.txt", result.toString());