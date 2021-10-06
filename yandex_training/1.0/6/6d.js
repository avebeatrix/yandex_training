/*

D. Космическое поселение

*/


let getResult = data => {
	let parse_bigints = (line) => {
		return line.trim().split(' ').map(input => BigInt(input));
	}
	let check = (m, checkparams) => {
		let [w, h, n] = checkparams;
		if ((w / (a + 2n * m)) * (h / (b + 2n * m)) >= n ||
			(w / (b + 2n * m)) * (h / (a + 2n * m)) >= n
		) {
			return true;
		} else return false;
	}
	let lRightSearch = (l, r, check, checkparams) => {

		while (l < r) {
			let m = ((r + l + 1n) / 2n);
			if (check(m, checkparams)) {
				l = m;
			} else {
				r = m - 1n;
			}
		}

		return l;
	}
	let [n, a, b, w, h] = parse_bigints(data[0]);
	let max = w > h ? w : h;
	let result = lRightSearch(0n, max, check, [w, h, n]);
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())