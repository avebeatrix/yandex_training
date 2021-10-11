/*

E. Кассы

*/

let getResult = data => {
	const LAST_MINUTE = 24 * 60;
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let N = parseInt(data[0].trim());

	let events = [];
	for (let i = 1; i <= N; i++) {
		let [start_h, start_m, end_h, end_m] = parse_ints(data[i]);
		let start_minutes = start_h * 60 + start_m;
		let end_minutes = end_h * 60 + end_m;
		if (end_minutes <= start_minutes) {
			events.push([start_minutes, 1, i - 1]);
			events.push([LAST_MINUTE, -1, i - 1]);
			events.push([0, 1, i - 1]);
			events.push([end_minutes, -1, i - 1]);
		} else {
			events.push([start_minutes, 1, i - 1]);
			events.push([end_minutes, -1, i - 1]);
		}
	}
	let mysort = (a, b) => {
		if (a[0] == b[0]) {
			return a[1] - b[1];
		}
		return a[0] - b[0];
	}
	events.sort(mysort);
	let counter = 0;
	let time = 0;
	let time_start = 0;
	events.forEach((event, index) => {
		if (counter === N && event[1] === -1) {
			time += event[0] - time_start;
		}
		counter += event[1];
		if (counter === N) {
			time_start = event[0];			
		}
	})
	return time;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())