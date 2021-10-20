let getResult = data => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let K = parseInt(data[0].trim());

	let result = [];
	for (let x = 1; x <= K; x++) {
		let str_arr = parse_ints(data[x]);
		let N = str_arr[0];
		let events = [];

		for (let j = 1; j <= N * 2; j = j + 2) {
			let start = str_arr[j];
			let end = str_arr[j + 1];
			let index = (j - 1) / 2;
			events.push([start, 1, index]);
			events.push([end, -1, index]);
		}
		events.sort((a, b) => {
			if (a[0] === b[0]) {
				return b[1] - a[1];
			}
			return a[0] - b[0];
		})
		let good = new Set();
		let current = new Set();
		if (events[0][0] !== 0 || events[events.length - 1][0] < 10000) {
			result.push(false);
		} else {
			let goodFlag = true;
			let prevtime = -1;
			for (let event of events) {
				if (event[0] !== 0 && current.size === 0) {
					goodFlag = false;
					break;
				}
				if (current.size === 1 && event[0] !== prevtime) {
					current.forEach(val => {
						good.add(val);
					})
				}
				if (event[1] === 1) {
					current.add(event[2]);
				} else {
					current.delete(event[2]);
				}
				prevtime = event[0];
			}
			if (events[events.length-1][0] !== 10000){
				goodFlag = false;
			}

			if (goodFlag && good.size === N) {
				result.push(true);
			} else {
				result.push(false);
			}
		}
	}
	return result.map(val => val ? 'Accepted' : 'Wrong Answer').join('\n').trim();
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())