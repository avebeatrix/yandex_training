/*

B. Точки и отрезки

*/



//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

let data = fileContent.toString().trim().split("\n");




let events = [];
let [n, m] = data[0].split(' ').map(input => parseInt(input));
for (let i = 1; i <= n; i++) {
	let [a, b] = data[i].split(' ').map(input => parseInt(input));
	events.push([b, -1]);
	events.push([a, 1000000001]);
}
let dots = data[n + 1].split(' ').map(input => parseInt(input));
dots.forEach((val, index) => {
	events.push([val, index]);
})
data = null;
dots = null;
let result = [];
events.sort((a, b) => {
	if (a[0] === b[0]) {
		return b[1] - a[1];
	} else {
		return a[0] - b[0];
	}
})


let observers_count = 0;
events.forEach(event => {
	if (event[1] === 1000000001) {
		observers_count++;
	} else if (event[1] < 1000000001 && event[1] > -1) {
		result[event[1]] = observers_count;
	} else {
		observers_count--;
	}
})


result = result.join(' ').trim();

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());

const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

const memoryData = process.memoryUsage()

const memoryUsage = {
	rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
	heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
	heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
	external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
}

console.log(memoryUsage)