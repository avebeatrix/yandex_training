/*

H. Расшифровка письменности Майя

*/

let getResult = data => {
	data = data.trim().split("\n")
	let [word_length, all_length] = data[0].split(' ').map(input => parseInt(input))
	let word = data[1].trim()
	let s = data[2].trim()
	let word_dict = new Map()
	let all_dict = new Map()
	let second_dict = new Map();
	[...word].forEach(element => {
		let count = word_dict.get(element);
		if (count == undefined) {
			word_dict.set(element, 1)
		} else {
			word_dict.set(element, count + 1)
		}
	})
	let result = 0
	for (let i = 0; i < all_length; i++) {
		let current_symbol_cnt = all_dict.get(s[i]);
		if (current_symbol_cnt == undefined) {
			all_dict.set(s[i], 1)
		} else {
			all_dict.set(s[i], current_symbol_cnt + 1)
		}

		if (i - word_length >= 0) {
			let prev_symbol_cnt = second_dict.get(s[i - word_length]);
			if (prev_symbol_cnt == undefined) {
				second_dict.set(s[i - word_length], 1)
			} else {
				second_dict.set(s[i - word_length], prev_symbol_cnt + 1)
			}
		}
		let is_candidate = true;
		for (var [key, val] of word_dict) {
			let cf = second_dict.get(key)
			if (cf == undefined) cf = 0
			let ca = all_dict.get(key)
			if ((ca == undefined) || ca - cf != val) {
				is_candidate = false
				break
			}
		}
		if (is_candidate) result++

	}
	return result
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString()

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())