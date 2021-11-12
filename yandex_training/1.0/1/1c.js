/* C. Телефонные номера */
let findNumbers = (nowNumbers, d) => {
	let clean = number => {
		if (number.length > 7) {
			if (number.substring(1, 4) == '495') {
				number = number.substring(number.length - 7, number.length);
			}
			number = number.substring(number.length - 9, number.length);
		}
		return number;
	}
	let result = [];
	nowNumbers.forEach(nowNumber => {
		if (clean(nowNumber) == clean(d)) result.push('YES');
		else result.push('NO');

	});
	return result;
}


const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [a, b, c, d] = fileContent.toString().split("\n").map(input => {
	return input.replace(/[^\d]/g, '');
});
const result = findNumbers([b, c, d], a).join("\n");
fs.writeFileSync("output.txt", result);