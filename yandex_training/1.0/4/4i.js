/*

I. Контрольная по ударениям

*/


let getErrorCount = data => {
	data = data.trim().split("\n")
	let dict_length = parseInt(data[0].trim())
	let dict = new Set()
	let dict_lowerCase = new Set()
	for (let i = 0; i < dict_length; i++) {
		dict.add(data[i + 1].trim())
		dict_lowerCase.add(data[i + 1].trim().toLowerCase())
	}
	let text_words = data[dict_length + 1]
	let result = 0
	if (text_words !== undefined) {
		text_words = text_words.trim().split(' ')


		text_words.forEach(word => {
			let word_lowerCase = word.toLowerCase()
			if (!dict.has(word)) {
				if (dict_lowerCase.has(word_lowerCase)) {
					result++
				} else if (word_lowerCase == word) {
					result++
				} else {
					let accent_count = 0;
					[...word].forEach(letter => {
						if (letter.toLowerCase() != letter) {
							accent_count++
						}
					})
					if (accent_count > 1) {
						result++
					}

				}
			}
		});
	}

	return result
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString()

const result = getErrorCount(data)

fs.writeFileSync("output.txt", result.toString())