/*

D. Клавиатура

*/

let getKeyboard = data => {
	data = data.split("\n")
	let n = parseInt(data[0])
	let press_ability = data[1].trim().split(' ').map(input => parseInt(input))
	let seq = data[3].trim().split(' ').map(input => parseInt(input))
	let press_dict = new Array(n).fill(0);
	let press_result = new Array(n).fill('NO')
	for (let key of seq) {
		press_dict[key - 1]++

	}
	for (let i = 0; i < n; i++) {
		if (press_dict[i] > press_ability[i]) press_result[i] = 'YES'
	}
	return press_result.join("\n")
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString()

const result = getKeyboard(data)

fs.writeFileSync("output.txt", result.toString())