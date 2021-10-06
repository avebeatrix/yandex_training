/*

J. Дополнительная проверка на списывание

*/

let getIdentifikator = data => {

	let addToMap = (left_pointer, right_pointer, word) => {
		if (left_pointer !== false && right_pointer !== false) {
			let mysubstr = word.substring(left_pointer, right_pointer + 1)

			let letter = mysubstr.charCodeAt(0);
			if (letter >= 48 && letter <= 57 && can_digit_start && mysubstr.length > 1 || !(letter >= 48 && letter <= 57)) {
				if (!keys_dict.has(mysubstr)) {

					let sub_candidate_count = program_identifikators.get(mysubstr)
					if (sub_candidate_count != undefined) {
						program_identifikators.set(mysubstr, sub_candidate_count + 1)
						if (sub_candidate_count + 1 > max_counter) max_counter = sub_candidate_count + 1
					} else {
						program_identifikators.set(mysubstr, 1)
					}
				}
			}
		}
	}

	data = data.trim().split("\n")
	let [keys_count, case_sensitivity, can_digit_start] = data[0].trim().split(' ').map(input => {
		if (input == 'yes') { return true }
		else if (input == 'no') { return false }
		else return parseInt(input);
	})
	if (!case_sensitivity) {
		data.forEach((input, index) => data[index] = input.toLowerCase())
	}
	let max_counter = 1
	let keys_dict = new Set()
	for (let i = 1; i <= keys_count; i++) {
		keys_dict.add(data[i].trim())
	}
	let result = ''
	let program_identifikators = new Map()
	for (let i = keys_count + 1; i < data.length; i++) {
		[...data[i].trim().split(' ')].forEach(word => {
			let candidate = word.trim()
			let is_single_digit = candidate.length == 1 && parseInt(candidate) == candidate

			if (!is_single_digit && candidate != '') {

				let left_pointer = right_pointer = false;
				for (let j = 0; j < word.length; j++) {
					let letter = word.charCodeAt(j)

					if (letter >= 65 && letter <= 90 ||
						letter >= 97 && letter <= 122 ||
						letter >= 48 && letter <= 57 ||
						letter == 95) {
						if (left_pointer === false) {
							left_pointer = j
						}
						right_pointer = j
					} else {
						addToMap(left_pointer, right_pointer, word)
						left_pointer = false
						right_pointer = false
					}
				}
				addToMap(left_pointer, right_pointer, word)

			}


		});
	}
	program_identifikators.forEach((value, key) => {
		if (value == max_counter && result == '') {
			result = key
		}
	});


	return result
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString()

const result = getIdentifikator(data)

fs.writeFileSync("output.txt", result)