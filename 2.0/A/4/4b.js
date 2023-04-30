/* B. Головоломка */
let getResult = (data) => {
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}
	let [n, m] = parse_ints(data[0]);

	let table_letters = new Map();
	for (i = 1; i <= n; i++) {
		data[i].trim().split('').forEach(letter => {
			if (table_letters.has(letter)) {
				table_letters.set(letter, table_letters.get(letter) + 1);
			} else {
				table_letters.set(letter, 1);
			}
		})
	}

	for (let i = n + 1; i <= n + m; i++) {
		data[i].trim().split('').forEach(letter => {
			table_letters.set(letter, table_letters.get(letter) - 1);
		})
	}
	let result = '';
	table_letters.forEach((val, key) => {
		for (let i = 1; i <= val; i++) {
			result += key;
		}
	})

	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());