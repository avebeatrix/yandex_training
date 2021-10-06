/* B. Покраска забора */
let getResult = (data) => {
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let lRightSearch = (l, r, check, checkparams) => {

		while (l < r) {
			let m = Math.floor((r + l + 1) / 2);
			if (check(m, checkparams)) {
				l = m;
			} else {
				r = m - 1;
			}
		}

		return l;
	}
	let check = (m, checkparams) => {
		let [a, k] = checkparams;
		let sum = a[0];
		for (let i = 1; i < a.length - 1; i++) {
			sum += Math.max(a[i] - sum, m);
		}
		if (k - sum >= m) {
			return true;
		}
		return false;
	}

	let [n, k] = parse_ints(data[0]);
	let a = parse_ints(data[1]);
	a.sort((a, b) => a - b);
	let limit = a[0];
	if (n == 1) {
		return Math.min(k, a[0]);
	}
	limit = lRightSearch(0, limit, check, [a, k]);

	return limit;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());


