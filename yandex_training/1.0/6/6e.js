/*

D. Космическое поселение

*/

let getResult = data => {
	let check = (m, checkparams) => {
		let [a, b, c] = checkparams;		

		if ((a * 2n + b * 3n + c * 4n + m * 5n) * 2n >= 7n * (a + b + c + m)) {
			return true;
		} else return false;
	}
	let lLeftSearch = (l, r, check, checkparams) => {
		while (l < r) {
			let m = (r + l) / 2n;
			if (check(m, checkparams)) {
				r = m;
			} else {
				l = m + 1n;
			}
		}

		return l;
	}
	let [a, b, c] = data.map(input => BigInt(input.trim()));
	let result = lLeftSearch(0n, 3000000000000000n, check, [a, b, c]);
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())