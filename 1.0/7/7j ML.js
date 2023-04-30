/* J. НГУ-стройка */

let getResult = data => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}

	const TOP = 0;
	const BOTTOM = 1;

	let createBlock = (z1, z2) => {
		return {
			'z1': z1,
			'z2': z2,
		}
	}

	let [N, W, L] = parse_ints(data[0]);
	let S = W * L;
	let events = [];
	let blocks = [0];
	for (let i = 1; i <= N; i++) {
		let [x1, y1, z1, x2, y2, z2] = parse_ints(data[i]);
		blocks.push(createBlock(z1, z2));
		let s = (x2 - x1) * (y2 - y1);
		events.push([z1, BOTTOM, s]);
		events.push([z2, TOP, s]);
	}
	events.sort((a, b) => {
		if (a[0] === b[0]) {
			return a[1] - b[1];
		}
		return a[0] - b[0];
	});

	let block_count = 0
	let min_block_count = N + 1;
	let min_z = 0;
	let curS = S;

	for (let event of events) {
		let [z, type, area] = event;

		if (type === TOP) {
			block_count--;
			curS += area;

		} else {
			block_count++;
			curS -= area;
			if (curS == 0) {
				if (block_count < min_block_count) {
					min_z = z;
					min_block_count = block_count;
				}
			}
		}
	}

	if (min_block_count > N) {
		return 'NO';
	} else {
		let result = 'YES\n' + min_block_count + '\n';
		for (let i = 1; i <= N; i++) {
			if (blocks[i].z1 <= min_z && blocks[i].z2 > min_z) {
				result += i + ' ';
			}
		}
		return result.trim();
	}
}

//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

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