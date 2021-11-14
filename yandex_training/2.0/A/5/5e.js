/* E. Странные строки */

/* подсказки: площадь объединения прямоугольников, метод сканирующей прямой */

let getResult = (data) => {

	let arr = data[0].split('');

	let differentLetters = new Set(arr);
	if (differentLetters.size === 1) {
		return arr.length;
	}

	let charMap = new Map();
	let curChar = arr[0];
	let counter = 0;
	let words = new Set();

	let word = '';
	let different_chars_counter = 0;

	for (char of arr) {
		if (char === curChar) {
			counter++;
		} else {
			charMap.set(curChar, Math.max(counter, charMap.get(curChar) ?? 0));

			word += curChar + counter;
			different_chars_counter++;

			if (different_chars_counter > 1) {
				words.add(word);
				word = curChar + counter;
				different_chars_counter = 1;
			}

			counter = 1;
			curChar = char;

		}
	}
	charMap.set(curChar, Math.max(counter, charMap.get(char) ?? 0));
	if (word != curChar + counter) {
		words.add(word + curChar + counter);
	}

	let result = 0;

	charMap.forEach(val => result += val);

	let getPartOfWord = word => {
		let char1 = word[0];
		let count1 = parseInt(word.slice(1));
		let char2 = word.substr(word.indexOf(count1) + count1.toString().length, 1);
		let count2 = parseInt(word.slice(word.indexOf(char2) + 1));
		return [char1, count1, char2, count2];
	}
	words = [...words];

	words.sort((a, b) => {
		let [a_char1, a_count1, a_char2, a_count2] = getPartOfWord(a);
		let [b_char1, b_count1, b_char2, b_count2] = getPartOfWord(b);

		if (a_char1 > b_char1) {
			return 1;
		} else if (a_char1 < b_char1) {
			return -1;
		}
		else {
			if (a_char2 > b_char2) {
				return 1;
			} else if (a_char2 < b_char2) {
				return -1;
			} else {
				if (a_count1 === b_count1) {
					return a_count2 - b_count2;
				}
				return a_count2 - b_count2;
			}
		}
	})

	let current_word = words[0];

	let getAreaSum = () => {
		let i = 1;
		while (true) {
			if (area[i] === undefined) {
				break;
			}
			sum += area[i];
			i++;
		}
		result += sum;
		sum = 0;
		area = [];
	}

	let sum = 0;
	let area = [];
	words.forEach(word => {
		let [char1, count1, char2, count2] = getPartOfWord(word);
		let [cur_char1, , cur_char2,] = getPartOfWord(current_word);
		if (char1 !== cur_char1 || char2 !== cur_char2) {
			getAreaSum();
		}
		for (let i = 1; i <= count1; i++) {
			area[i] = Math.max(area[i] ?? 0, count2);
		}
		current_word = word;
	})
	getAreaSum();

	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
