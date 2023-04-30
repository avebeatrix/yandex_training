/* E. Дипломы в папках */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}

	let [N] = parse_ints(data[0]);
	let folders = parse_ints(data[1]);

	let biggest_folder = Math.max(...folders);
	let time = 0;
	let is_skipped_biggest = false;
	for (let i = 0; i < N; i++) {
		if (folders[i] === biggest_folder && !is_skipped_biggest){
			is_skipped_biggest = true;
			continue;
		} 
		time += folders[i];
	}
	return time;
}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());