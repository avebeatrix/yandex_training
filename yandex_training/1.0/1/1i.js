/* I. Узник замка Иф */
let mySort = (a, b) => {
	return a - b;
}

let checkLimits = (k, l, m, n) => {
	let variant = [k, l, m, n];
	variant.sort(mySort);
	let min = m > n ? n : m;
	let max = m > n ? m : n;
	if ((variant[3] == max) && variant[1] <= min) {
		return true;
	}
	return false;
}
let findSolutionUznik = (a, b, c, d, e) => {

	if (checkLimits(a, c, d, e)) return 'YES';
	if (checkLimits(a, b, d, e)) return 'YES';
	if (checkLimits(b, c, d, e)) return 'YES';

	return 'NO';

}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const [a, b, c, d, e] = fileContent.toString().split("\n").map(input => {
	return parseInt(input);
});

const result = findSolutionUznik(a, b, c, d, e);

fs.writeFileSync("output.txt", result.toString());

