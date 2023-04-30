/*

I. Полиглоты

*/

getResult = data => {
	let N = parseInt(data[0].trim())
	let setAll = new Set()
	let setMin = new Set()
	let position = 1
	let student_counter = 1
	let student_langs = []
	while (student_counter <= N) {
		let student_lang_counter = parseInt(data[position].trim())
		position++
		student_counter += 1

		if (student_lang_counter > 0) {
			for (j = position; j < position + student_lang_counter; j++) {
				let lang = data[j].trim()
				setAll.add(lang)
				if (!student_langs[lang]) {
					student_langs[lang] = 1
				} else student_langs[lang]++
			}
			position += student_lang_counter
		}
	}
	let result_str = ''
	let know_all = 0
	for (let item in student_langs) {
		if (student_langs[item] == N) {
			know_all++
			result_str += item + "\n"
		}
	}
	result_str = know_all + "\n" + result_str.trim() + "\n"

	result_str += setAll.size + "\n";
	for (item of setAll) {
		result_str += item + "\n";
	}
	return result_str;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")
let data = fileContent.toString().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())