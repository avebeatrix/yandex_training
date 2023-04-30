/*

G. Площадь

*/

let getResult = data => {

	let check = (s, checkparams) => {
		let [n, m, t] = checkparams;
		let long_side_count = 2n * s * n;
		let short_side_count = 2n * s * (m - 2n * s);
		if (short_side_count < 0) return true;
		if (long_side_count + short_side_count <= t) {
			return true;
		} else return false;
	}
	let lRightSearch = (l, r, check, checkparams) => {

		while (l < r) {
			let s = ((r + l + 1n) / 2n);
			if (check(s, checkparams)) {
				l = s;
			} else {
				r = s - 1n;
			}
		}	
		return l;
	}
	let [n, m, t] = data.map(input => BigInt(input.trim()));
	let a = n > m ? n : m;
	let b = n > m ? m : n;
	let result = lRightSearch(0n, b / 2n, check, [b, a, t]);
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())