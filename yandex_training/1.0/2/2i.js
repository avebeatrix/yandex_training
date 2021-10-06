/*

I. Сапер

*/

let getField = (coords, N, M, K) => {
	let result_str = '';
	let result = [];
	for (let i = 0; i < N + 2; i++) {
		result[i] = [];
		for (let j = 0; j < M + 2; j++) {
			result[i][j] = 0;
		}
	}
	for (let i = 0; i < K; i++) {
		result[1 + coords[i][0] - 1][1 + coords[i][1] - 1] = '*';
	}
	console.log(result);
	let dx = [1, 1, 1, 0, 0, -1, -1, -1];
	let dy = [-1, 0, 1, -1, 1, -1, 0, 1];
	let min_counter_around = 0;
	for (let i = 1; i < N + 1; i++) {
		for (let j = 1; j < M + 1; j++) {
			if (result[i][j] != '*') {
				for (let s = 0; s < 8; s++) {
					if (result[i + dx[s]][j + dy[s]] == '*') min_counter_around++;
				}
				result[i][j] = min_counter_around;
			}
			min_counter_around = 0;
		}
	}
	for (let i = 1; i < N + 1; i++) {
		for (let j = 1; j < M + 1; j++) {
			result_str += result[i][j] + ' ';
		}
		result_str = result_str.trim() + "\n";
	}
	return result_str.trim();
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split("\n");
const first_string = data[0].split(" ").map(input => {
	return parseInt(input);
});

const N = first_string[0];
const M = first_string[1];
const K = first_string[2];

let coords = [];

for (let i = 1; i < data.length; i++) {
	coords[i - 1] = data[i].toString().split(" ").map(input => {
		return parseInt(input);
	});
}

const result = getField(coords, N, M, K);

fs.writeFileSync("output.txt", result.toString());