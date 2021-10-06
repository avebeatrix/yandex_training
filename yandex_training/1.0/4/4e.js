/*

E. Пирамида

*/

let getHeight = data => {
	data = data.split("\n")
	let count = parseInt(data[0].trim())
	let width = []
	let height = []
	let dict = new Map()
	for (let i = 1; i <= count; i++) {
		[width[i - 1], height[i - 1]] = data[i].trim().split(" ").map(input => parseInt(input))


		if (dict.get(width[i - 1]) === undefined) {
			dict.set(width[i - 1], i - 1)
		} else {
			if (height[dict.get(width[i - 1])] < height[i - 1]) {
				dict.set(width[i - 1], i - 1)
			}
		}
	}
	let max_height = 0
	for (let val of dict.values()) {
		max_height += height[val]
	}

	return max_height
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString()

const result = getHeight(data)

fs.writeFileSync("output.txt", result.toString())