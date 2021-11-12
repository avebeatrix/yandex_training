/* G. Детали */
let findTime = (a, b, n, m) => {
	let x_min = n + a * (n - 1);
	let x_max = n + a * (n + 1);
	let y_min = m + b * (m - 1);
	let y_max = m + b * (m + 1);
	if (x_max < y_min || y_max < x_min) return '-1';
	let res = [x_min, x_max, y_min, y_max];

	res.sort((a, b) => {
		return a - b;
	})

	return res[1] + ' ' + res[2];
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [a, b, n, m] = fileContent.toString().split("\n").map(input => {
	return parseInt(input);
});

const result = findTime(a, b, n, m);

fs.writeFileSync("output.txt", result.toString());