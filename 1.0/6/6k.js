/*

K. Медиана объединения-2

*/

let getResult = data => {
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let check2 = (m, checkparams) => {
		let [curval, seq] = checkparams;
		if (seq[m] <= curval) return false;
		return true;
	}

	let check = (m, checkparams) => {
		let [L, control_seq, second_seq] = checkparams;
		let second_index = lLeftSearch(0, L - 1, check2, [control_seq[m], second_seq]);
		let count = m + second_index + 2;
		if (count <= L) return false;
		return true;
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
	let initSeq = (x, d, a, c, m, L) => {
		let d_arr = [d];
		let x_arr = [x];
		for (let i = 1; i < L; i++) {
			x_arr.push(x_arr[i - 1] + d_arr[i - 1]);
			d_arr.push((((d_arr[i - 1] % m) * a % m) % m + c % m) % m);
		}
		return x_arr;
	}

	let [N, L] = parse_ints(data[0]);
	let seqs = [];
	for (let i = 1; i <= N; i++) {
		let [x, d, a, c, m] = parse_ints(data[i]);
		let x_arr = initSeq(x, d, a, c, m, L);
		seqs.push(x_arr);
	}
	let result = '';
	for (let i = 0; i < N; i++) {
		for (let j = i + 1; j < N; j++) {
			let left_finded = lLeftSearch(0, L - 1, check, [L, seqs[i], seqs[j]]);
			let right_finded = lLeftSearch(0, L - 1, check, [L, seqs[j], seqs[i]]);
			result += Math.min(seqs[i][left_finded], seqs[j][right_finded]) + '\n';
		}
	}

	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())