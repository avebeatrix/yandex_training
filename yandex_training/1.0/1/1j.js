//Система линейных уравнений - 2

let findSolutionSystem = (a, b, c, d, e, f) => {
	let x = false;
	let y = false;

	let x_null = a == 0 && c == 0;
	let y_null = b == 0 && d == 0;

	let det = a * d - b * c;
	let det_x = e * d - b * f;
	let det_y = a * f - e * c;

	if (det != 0) {

		x = det_x / det;
		y = det_y / det;
		return '2 ' + x + ' ' + y;
	} else {
		if (det_x == 0 && det_y == 0) {
			if (x_null && y_null) {
				if (e != 0 || f != 0) {
					return '0';
				}
				else {
					return '5';
				}
			} else if (x_null) {
				if (b != 0) {
					y = e / b;
				}
				else {
					y = f / d;
				}
				return '4 ' + y;
			} else if (y_null) {
				if (a != 0) {
					x = e / a;
				}
				else {
					x = f / c;
				}
				return '3 ' + x;
			} else {
				let k, b_new;
				if (b != 0) {
					b_new = e / b;
					k = -a / b;
				}
				else {
					b_new = f / d;
					k = -c / d;
				}
				return '1 ' + k + ' ' + b_new;
			}
		} else {
			return '0';
		}
	}
	return '0';
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [a, b, c, d, e, f] = fileContent.toString().split("\n").map(input => {
	return parseFloat(input);
});

const result = findSolutionSystem(a, b, c, d, e, f);

fs.writeFileSync("output.txt", result.toString());