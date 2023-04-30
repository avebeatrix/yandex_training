/*

H. Провода

*/

let getResult = data => {

	let check = (m, checkparams) => {
		let [arr, k] = checkparams;
		let count = 0;
		arr.forEach(val => {
			count += Math.floor(val / m);
		})
		if (count >= k) return true;
		return false
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
		let count = 0;
		arr.forEach(val => {
			count += Math.floor(val / l);
		})
		if (count === 0) return 0;
		return l;
	}
	let [n, k] = data[0].trim().split(' ').map(input => parseInt(input.trim()));
	let arr = [];
	let max = 0;
	for (let i = 1; i <= n; i++) {
		let val = parseInt(data[i].trim());
		max = Math.max(max, val)
		arr.push(val);
	}

	let result = lRightSearch(0, max, check, [arr, k]);
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())