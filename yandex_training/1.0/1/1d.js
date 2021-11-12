/* D. Уравнение с корнем */
let findSolutions = (a, b, c) => {
	if (c < 0) return 'NO SOLUTION';

	let x = false;
	if (a == 0) {
		if (c * c == b) return 'MANY SOLUTIONS';
		return 'NO SOLUTION';
	}
	x = (c * c - b) / a;
	if (x % 1 !== 0) return 'NO SOLUTION';
	return x.toString();
}


const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [a, b, c] = fileContent.toString().split("\n").map(input => {
	return parseInt(input);
});
const result = findSolutions(a, b, c);

fs.writeFileSync("output.txt", result);