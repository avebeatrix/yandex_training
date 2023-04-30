/*

B. Точки и отрезки

*/

let getResult = data => {
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let myMapStart = new Map();
	let myMapEnd = new Map();
	let mySet = new Set();

	let [n, m] = parse_ints(data[0]);
	for (let i = 1; i <= n; i++) {
		let [a, b] = parse_ints(data[i]);
		if (a>b){
			a=a+b;
			b=a-b;
			a=a-b;
		}		
		if (myMapStart.has(a)) {
			myMapStart.set(a, myMapStart.get(a) + 1);
		} else {
			myMapStart.set(a, 1);
		}
		if (myMapEnd.has(b)) {
			myMapEnd.set(b, myMapEnd.get(b) + 1);
		} else {
			myMapEnd.set(b, 1);
		}
		if (!mySet.has(a)){
			mySet.add(a);
		}
		if (!mySet.has(b)){
			mySet.add(b);
		}		
	}
	let dots = parse_ints(data[n + 1]);
	let myDots = new Map();
	dots.forEach((val, index) => {
		if (!mySet.has(val)){
			mySet.add(val);
		}				
		if (myDots.has(val)) {
			myDots.get(val).push(index);
		} else {
			myDots.set(val, [index]);
		}
	})
	let result = [];
	let sorted_events = [...mySet];
	sorted_events.sort((a, b) => a - b)

	let observers_count = 0;
	sorted_events.forEach(event => {		
		if (myMapStart.has(event)) {
			observers_count += myMapStart.get(event);
		}
		if (myDots.has(event)) {			
			myDots.get(event).forEach(ind => {
				result[ind] = observers_count;
			})
		}
		if (myMapEnd.has(event)) {
			observers_count -= myMapEnd.get(event);
		}
	})


	return result.join(' ').trim();
}

//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());