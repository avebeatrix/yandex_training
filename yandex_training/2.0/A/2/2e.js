/* E. Газон */

let getResult = (data) => {
	let [x1, y1, x2, y2] = data[0].trim().split(' ').filter(input => input != '').map(input => parseInt(input));
	let [x0, y0, radius] = data[1].trim().split(' ').filter(input => input != '').map(input => parseInt(input));

	let result = 0;
	let left_bottom_x;
	let left_bottom_y;
	let top_right_x;
	let top_right_y;
	let x_start = x0 - radius;
	let x_end = x0 + radius;
	let y_start = y0 - radius;
	let y_end = y0 + radius;

	if (x1 > x2) {
		left_bottom_x = Math.max(x2, x_start);
		left_bottom_y = Math.max(y2, y_start);
		top_right_x = Math.min(x1, x_end);
		top_right_y = Math.min(y1, y_end);
	} else {
		left_bottom_x = Math.max(x1, x_start);
		left_bottom_y = Math.max(y1, y_start);
		top_right_x = Math.min(x2, x_end);
		top_right_y = Math.min(y2, y_end);
	}
	for (let i = left_bottom_y; i <= top_right_y; i++) {

		let x_len = Math.trunc(Math.sqrt(Math.pow(radius, 2) - Math.pow(y0 - i, 2)));
		let x_min = x0 - x_len;
		let x_max = x0 + x_len;
		if (x_min <= top_right_x) {
			x_min = Math.max(x_min, left_bottom_x);
			if (x_max >= left_bottom_x) {
				x_max = Math.min(x_max, top_right_x);
				let tmp = x_max - x_min + 1;
				if (tmp > 0) {
					result += tmp;
				}
			}

		}
	}

	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());