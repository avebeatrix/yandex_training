/* A. Угадай число - 2 */
let getResult = (data) => {
	let n = parseInt(data[0].trim());
	let answers = new Set();
	for (let i = 1; i <= n; i++) {
		answers.add(i);
	}

	let result = '';
	let new_vars;
	let i = 1;
	while (true) {
		if (data[i].trim() == 'HELP') {
			break;
		}
		let currentSet = new Set(data[i].split(' ').filter(input => input != '').map(input => parseInt(input)));
		new_vars = new Set([...currentSet].filter(val => answers.has(val)));
		if (new_vars.size > answers.size / 2) {
			result += "YES\n";
			answers = new Set([...answers].filter(val => currentSet.has(val)));
		} else {
			result += "NO\n";
			new_vars.forEach(val => {
				answers.delete(val);
			})
		}
		i++;
	}
	return result += [...answers].join(' ');
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());