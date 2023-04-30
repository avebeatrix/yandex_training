/* D. Выборы Государственной Думы */
let getResult = (data) => {

	const PLACES_COUNT = 450;
	let voteMap = new Map();
	let voteMapResult = new Map();
	let sum = 0;
	data.forEach(str => {
		let words = str.split(' ');
		let count = parseInt(words.pop());
		let name = words.join(' ');
		voteMap.set(name, (voteMap.get(name) ?? 0) + count);
		sum += count;
	})
	let new_sum = 0;
	let quotient = sum / PLACES_COUNT;
	voteMap.forEach((count, name) => {
		let new_count = Math.trunc(count / quotient);
		voteMap.set(name, count / quotient - new_count);
		voteMapResult.set(name, new_count);
		new_sum += new_count;
	})
	if (new_sum < PLACES_COUNT) {
		let sorted = [...voteMapResult.entries()].sort((a, b) => {			
			if (voteMap.get(a[0]) === voteMap.get(b[0])) {
				return b[1] - a[1];
			} else {				
				return voteMap.get(b[0]) - voteMap.get(a[0]);
			}
		})
		sorted.forEach(val => {
			let [name] = val;
			if (new_sum < PLACES_COUNT) {
				voteMapResult.set(name, voteMapResult.get(name) + 1);
				new_sum++;
			}
		})
	}
	return [...voteMapResult.entries()].map((input) => input.join(' ')).join('\n');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());