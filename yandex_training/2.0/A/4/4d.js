/* D. Числа */
let getResult = (data) => {
	let result = '';
	let mapA = new Map();
	let mapB = new Map();
	data[0].trim().split('').forEach(digit => {
		if (mapA.has(digit.toString())) {
			mapA.set(digit.toString(), mapA.get(digit) + 1);
		} else {
			mapA.set(digit.toString(), 1);
		}
	});
	data[1].trim().split('').forEach(digit => {
		if (mapB.has(digit.toString())) {
			mapB.set(digit.toString(), mapB.get(digit) + 1);
		} else {
			mapB.set(digit.toString(), 1);
		}
	});
	for (let i = 9; i >= 0; i--) {
		i = i.toString();
		if (mapA.has(i) && mapB.has(i)) {
			if (i == 0 && result== '') {
				result = '0';
			}else {
				for (let j = 1; j <= Math.min(mapA.get(i), mapB.get(i)); j++) {
					result += i + '';
				}
			}

		}
	}
	if (result == '') result = '-1';
	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());