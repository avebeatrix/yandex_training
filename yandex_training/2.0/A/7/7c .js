/* C. Объединение прямоугольников */
let getResult = (data) => {
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}

	let n = parseInt(data[0].trim());
	let result = 0n;

	let seqments = [];
	let allx = new Set();
	let ally = new Set();

	for (let i = 1; i <= n; i++) {
		let [x1, y1, x2, y2] = parse_ints(data[i]);
		if (x1 != x2 && y1 != y2) {
			seqments.push([x1, x2, y1, 1]);
			seqments.push([x1, x2, y2, -1]);
			allx.add(x1);
			allx.add(x2);
			ally.add(y1);
			ally.add(y2);
		}
	}
	allx = [...allx].sort((a, b) => a - b);
	ally = [...ally].sort((a, b) => a - b);
	seqments.sort((a, b) => a[2] - b[2]);

	for (let i = 1; i < allx.length; i++) {
		let prevY = 0;
		let cnt = 0;
		for (let j = 0; j < seqments.length; j++) {
			if (seqments[j][1] <= allx[i - 1] || seqments[j][0] >= allx[i]) {
				continue;
			}
			if (cnt == 0) {
				prevY = seqments[j][2];
			}
			cnt += seqments[j][3];
			if (cnt == 0) {
				result += BigInt(seqments[j][2] - prevY) * BigInt(allx[i] - allx[i - 1]);
			}

		}
	}

	return result;

}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
