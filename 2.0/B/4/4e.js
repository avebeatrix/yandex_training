/* E. Форум */
let getResult = (data) => {

	let N = parseInt(data[0]);
	let themeMap = new Map();
	let messages = new Array(N).fill(0);
	let pointer = 1;
	for (let i = 1; i <= N; i++) {
		let ans_to = parseInt(data[pointer]);
		pointer++;
		if (ans_to === 0) {
			let theme = data[pointer].trim();
			pointer += 2;
			themeMap.set(theme, (themeMap.get(theme) ?? 0) + 1);
			messages[i] = theme;
		} else {
			messages[i] = messages[ans_to];
			pointer++;
			themeMap.set(messages[ans_to], (themeMap.get(messages[ans_to]) ?? 0) + 1);
		}

	}
	return [...themeMap.entries()].sort((a, b) => {
		return b[1] - a[1]
	}).map(input => input[0]).shift();

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());