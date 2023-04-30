/*

D. Реклама

*/

let getResult = data => {
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let N = parseInt(data[0].trim());

	let events = [];
	for (let i = 1; i <= N; i++) {
		let [start, end] = parse_ints(data[i]);
		if (end - start >= 5) {
			events.push([start, -1, i - 1]);
			events.push([end - 5, 1, i - 1]);
		}
	}
	let mysort = (a, b) => {
		if (a[0] == b[0]) {
			return a[1] - b[1];
		}
		return a[0] - b[0];
	}
	events.sort(mysort);
	if (events.length === 0) {
		return '0 10 20';
	} else if (events.length === 2) {
		return `1 ${events[0][0]} ${events[0][0]+10}`;
	} else {
		let bestans = 0;
		let firstbest = 0;
		let secondbest = 0;
		let firstad = new Set();
		for (let i = 0; i < events.length; i++) {
			let event1 = events[i];
			if (event1[1] === -1) {
				firstad.add(event1[2]);
				if (firstad.size > bestans) {
					bestans = firstad.size;
					firstbest = event1[0];
					secondbest = event1[0] + 5;
				}
			}
			let secondadcont = 0;
			for (let j = i + 1; j < events.length; j++) {
				let event2 = events[j];
				if (event2[1] === -1 && !firstad.has(event2[2])) {
					secondadcont++;
				}
				if (event2[0] - 5 >= event1[0] && (firstad.size + secondadcont > bestans)) {
					bestans = firstad.size + secondadcont;
					firstbest = event1[0];
					secondbest = event2[0];
				}
				if (event2[1] === 1 && !firstad.has(event2[2])) {
					secondadcont--;
				}
			}
			if (event1[1] === 1) {
				firstad.delete(event1[2]);
			}
		}
		return `${bestans} ${firstbest} ${secondbest}`;
	}
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())