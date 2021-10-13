/*

F. Современники

*/

let getResult = data => {
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let N = parseInt(data[0].trim());

	let events = [];
	for (let i = 1; i <= N; i++) {
		let [start_day, start_month, start_year, end_day, end_month, end_year] = parse_ints(data[i]);

		let date_start = new Date(Date.parse(`${(start_year + 18).toString().padStart(4, "0")}-${start_month.toString().padStart(2, "0")}-${start_day.toString().padStart(2, "0")}`));
		let date_80 = new Date(Date.parse(`${(start_year + 80).toString().padStart(4, "0")}-${start_month.toString().padStart(2, "0")}-${start_day.toString().padStart(2, "0")}`));
		let date_end = new Date(Date.parse(`${(end_year).toString().padStart(4, "0")}-${end_month.toString().padStart(2, "0")}-${end_day.toString().padStart(2, "0")}`));
		date_end = date_end > date_80 ? date_80 : date_end;
		if (date_start < date_end) {
			events.push([date_start, 1, i]);
			events.push([date_end, -1, i]);
		}
	}
	if (events.length === 0) {
		return '0';
	}
	let mysort = (a, b) => {
		if (a[0].toString() == b[0].toString()) {
			return a[1] - b[1];
		}
		return a[0] - b[0];
	}
	events.sort(mysort);
	let result = '';
	let set = new Set();
	let isUpdated = false;
	for (let i = 0; i < events.length; i++) {
		if (events[i][1] === 1) {
			set.add(events[i][2]);
			isUpdated = true;
		} else {
			if (isUpdated) {
				result += [...set].join(' ') + '\n';
				isUpdated = false;
			}
			set.delete(events[i][2]);
		}
	}

	return result.trim();
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())