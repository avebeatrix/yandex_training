/*

A. Наблюдение за студентами

*/


let getResult = data => {
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let events = [];
	let [N, M] = parse_ints(data[0]);
	for (let i = 1; i <= M; i++) {
		let [start, end] = parse_ints(data[i]);
		events.push([end, -1]);
		events.push([start, 1]);
	}
	events.sort((a, b) => {
		if (a[0] === b[0]) {
			return b[1] - a[1];
		} else {
			return a[0] - b[0];
		}
	})
	let result = 0;
	let prev_place = 1;
	let observers_count = 0;
	events.forEach(event => {
		if (event[1] === 1) {
			if (observers_count === 0) {
				result += event[0] - prev_place;
			}
			observers_count++;
		}
		if (event[1] === -1) {
			observers_count--;
		}

		if (observers_count === 0) {
			prev_place = event[0] + 1;
		}
	})
	if (prev_place <= N) {
		result += N - prev_place + 1;
	}

	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())