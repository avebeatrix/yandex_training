/*

F. Очень легкая задача

*/

let getResult = data => {

	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}

	let check = (m, checkparams) => {
		let [n, x, y] = checkparams;
		let fast = Math.floor(m / Math.min(x, y));
		let time_for_slow = m - Math.min(x, y);
		if (time_for_slow < 0) time_for_slow = 0;
		let slow = Math.floor(time_for_slow / Math.max(x, y));
		if (fast + slow >= n) {
			return true;
		} else return false;
	}
	let lLeftSearch = (l, r, check, checkparams) => {
		while (l < r) {
			let m = Math.floor((r + l) / 2);
			if (check(m, checkparams)) {
				r = m;
			} else {
				l = m + 1;
			}
		}

		return l;
	}
	let [n, x, y] = parse_ints(data[0]);
	let result = lLeftSearch(0, 2000000000, check, [n, x, y]);
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())