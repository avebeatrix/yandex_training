/* F. Расстановка ноутбуков */
let findMinCommonSquare = (rect1, rect2) => {
	let square = 2000 * 1000;
	let a = 0;
	let b = 0;
	for (let i = 0; i <= 1; i++) {
		for (let j = 0; j <= 1; j++) {
			let variant_a = rect1[i] + rect2[j];
			let variant_b = rect1[(i + 1) % 2] > rect2[(j + 1) % 2] ? rect1[(i + 1) % 2] : rect2[(j + 1) % 2];
			let variant = variant_a * variant_b;
			if (variant_a * variant_b < square) {
				square = variant;
				a = variant_a;
				b = variant_b;
			}
		}
	}
	return a + ' ' + b;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [a, b, c, d] = fileContent.toString().split(" ").map(input => {
	return parseInt(input);
});

const result = findMinCommonSquare([a, b], [c, d]);

fs.writeFileSync("output.txt", result);