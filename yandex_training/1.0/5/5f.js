/*

F. Кондиционеры

*/

let getResult = data => {
	let classes = data[1].trim().split(' ').map(input => parseInt(input));
	let length_cond = parseInt(data[2].trim());
	let result = 0;
	let cond_prices = new Map();
	for (let i = 1; i <= 1000; i++) {
		cond_prices.set(i, 0);
	}
	for (let i = 3; i < 3 + length_cond; i++) {
		let [power, price] = data[i].trim().split(' ').map(input => parseInt(input));
		let old_price = cond_prices.get(power);
		if (old_price === 0) {
			cond_prices.set(power, price);
		} else {
			if (old_price > price) {
				cond_prices.set(power, price);
			}
		}
	}
	let prev = 0;
	for (let i = 1000; i >= 1; i--) {
		let price = cond_prices.get(i);
		if (price == 0 && prev != 0) {
			cond_prices.set(i, prev);
		} else if (price > prev && prev != 0) {
			cond_prices.set(i, prev);
		} else {
			prev = price;
		}
	}
	classes.forEach(val => {
		result += cond_prices.get(val);
	})

	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())