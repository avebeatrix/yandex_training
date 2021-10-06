/* D. Древние цивилизации */
let getResult = (data) => {
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let n = parseInt(data[0]);
	let timeline = []
	for (let i = 1; i <= n; i++) {
		let [start, end] = parse_ints(data[i]);

		timeline.push([end, -1, i]);
		timeline.push([start, 1, i]);
	}
	timeline.sort((a, b) => {
		if (a[0] == b[0]) {
			return a[1] - b[1];
		} else {
			return a[0] - b[0];
		}
	})

	let result = 0;
	let min = 2000000001;
	let live = 1;

	let live_pointer = 0;
	for (let i = 1; i < timeline.length; i++) {
		if (timeline[i][1] == -1) {
			if (live > 0) {
				if ((timeline[i][2] == timeline[live_pointer][2])) {
					live_pointer--;
				}
				if (live_pointer >= 0 && timeline[i][1] - timeline[live_pointer][1] < min) {
					min = timeline[i][1] - timeline[live_pointer][1];
					result = timeline[live_pointer][2] + ' ' + timeline[i][2];
				}
			}
		} else {
			live_pointer = i;
		}
		live += timeline[i][1];

	}
	return result;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());

