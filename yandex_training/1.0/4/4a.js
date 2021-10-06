/*

A. Словарь синонимов

*/

let getSyn = data => {
	let count = parseInt(data[0])
	let dict = []
	for (let i = 1; i <= count; i++) {
		let [a, b] = data[i].split(' ').map(input => input.toString().trim())
		dict[a] = b
		dict[b] = a
	}
	let find = data[data.length - 1].trim();	
	return dict[find] ? dict[find] : '';
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getSyn(data)

fs.writeFileSync("output.txt", result.toString())