/* C. Драгоценные камни */
let getResult = (data) => {
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}
	let [n, k] = parse_ints(data[0]);
	let countMap = new Map();
	let str_arr = data[1].trim().split('');
	str_arr.forEach(letter => {
		if (countMap.has(letter)) {
			countMap.set(letter, countMap.get(letter) + 1);
		} else {
			countMap.set(letter, 1);
		}
	})

	let pairs = new Map();
	for (let i = 2; i <= k + 1; i++) {
		let str = data[i].trim().split('');
		let first_letter = str[0];
		if (pairs.has(first_letter)) {
			let variants = pairs.get(first_letter);
			variants.push(str);
			pairs.set(first_letter, variants);
		} else {
			pairs.set(str[0], [str]);
		}
	}

	let result = 0;

	str_arr.forEach(letter => {
		countMap.set(letter, countMap.get(letter) - 1);
		if (pairs.has(letter)) {
			pairs.get(letter).forEach(pair => {
				if (countMap.has(pair[1])) {
					result += countMap.get(pair[1]);
				}
			})
		}

	})


	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());