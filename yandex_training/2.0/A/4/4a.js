/* A. Палиндром */
let getResult = (data) => {
	let str = data[1].trim();
	let countMap = new Map();
	for (let i = 0; i < str.length; i++) {
		let letter = str.charAt(i);
		countMap.set(letter, countMap.has(letter) ? countMap.get(letter) + 1 : 1);
	}
	let max_odd = 0;
	let letters_unique_sorted = [];
	let odd_counter = 0;
	countMap.forEach((val, key) => {
		letters_unique_sorted.push(key);
		if (val % 2 == 1) {
			odd_counter++;
			if (val > max_odd) max_odd = val;
		}
	})
	letters_unique_sorted.sort((a, b) => {
		return a > b ? 1 : a < b ? -1 : 0
	});

	let palindrom_length = 0;
	let finded_first_max_odd = false;
	letters_unique_sorted.forEach(key => {
		if (odd_counter > 1 && countMap.get(key) % 2 == 1) {
			if (!finded_first_max_odd && countMap.get(key) == max_odd) {
				finded_first_max_odd = true;
			} else {
				countMap.set(key, countMap.get(key) - 1)
			}
		}
		palindrom_length += countMap.get(key);
	})
	let palindrom = new Array(palindrom_length);

	let left_pointer = 0;
	letters_unique_sorted.forEach((letter) => {
		let count = countMap.get(letter);
		if (count > 0) {
			let middle = count / 2 - 1;
			if (count % 2 == 1) {
				middle = Math.floor(count / 2);
			}
			for (let i = 0; i <= middle; i++) {
				if (i == middle && count % 2 == 1) {
					palindrom[Math.floor(palindrom.length / 2)] = letter;
				} else {
					palindrom[left_pointer] = letter;
					palindrom[palindrom.length - 1 - left_pointer] = letter;
					left_pointer++;
				}
			}
		}
	})

	return palindrom.join('');
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());