/* C. Каждому по компьютеру */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}

	let [N, M] = parse_ints(data[0]);
	let X = parse_ints(data[1]).map((val, i) => [val, i]);
	let Y = parse_ints(data[2]).map((val, i) => [val, i]);
	X.sort((a, b) => a[0] - b[0]);
	Y.sort((a, b) => a[0] - b[0]);
	let Xmap = new Map();
	for (let i = 0; i < N; i++) {
		Xmap.set(i + 1, 0);
	}
	let room_pointer = 0;
	let result = 0;
	for (let i = 0; i < N; i++) {
		while (room_pointer < M) {
			if (Y[room_pointer][0] >= X[i][0] + 1) {
				result++;
				Xmap.set(X[i][1] + 1, Y[room_pointer][1] + 1);
				room_pointer++;
				break;
			} else {
				room_pointer++;
			}
		}

	}

	return result + '\n' + [...Xmap.entries()].map(val => val[1]).join(' ');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());