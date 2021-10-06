/* B. Билеты */
let getResult = (data) => {
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
		let [A, B, C, X, K] = checkparams;
		let sum = m * K;
		if (sum <= X) return true;
		return false;
	}
	let check2 = (m, checkparams) => {
		let [A, B, C, X, K] = checkparams;
		let sum = (m + m * (C / 100)) * K;
		if (sum <= X) return true;
		return false;
	}

	let result = 0;
	let [A, B, C, X, K] = data[0].trim().split(' ').filter(val => val != '').map(input => parseInt(input));

	result = lRightSearch(1, Math.floor(X / K), check, [A, B, C, X, K]);
	if (result <= B && result >= A) {
		result = lRightSearch(A, Math.min(result, B), check2, [A, B, C, X, K]);
	}
	let sum = result;
	if (sum >= A && sum <= B) {
		sum = (sum + sum * (C / 100)) * K;
		if (sum > X) {
			result = lRightSearch(1, A - 1, check, [A, B, C, X, K]);
			sum = result * K;
		}
	} else {
		sum = sum * K;
	}
	if (sum > X) return 0;

	return result;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());

