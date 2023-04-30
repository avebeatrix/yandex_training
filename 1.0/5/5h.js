/*

H. Подстрока

*/
let getResult = data => {
	let [n, k] = data[0].trim().split(' ').map(input => parseInt(input));
	let str = data[1].trim();
	let seq = str.split('');

	let pointer = 0;
	let index = 0;
	let result_len = 0;
	let start = 0;
	let current_index = -1;
	let countMap = new Map();
	while (index < n) {
		if (current_index!=index){
			if (countMap.has(seq[index])) {
				countMap.set(seq[index], countMap.get(seq[index]) + 1);
			} else {
				countMap.set(seq[index], 1);
			}
		}		
		current_index = index;
		if (countMap.get(seq[index]) > k || index==n-1) {
			if(countMap.get(seq[index]) <= k && index==n-1) index++;
			if (index - pointer > result_len) {
				result_len = index - pointer;
				start = pointer+1;
			}
			countMap.set(seq[pointer], countMap.get(seq[pointer])-1);
			pointer++;			
		} else {
			index++;
		}
	}

	return result_len + ' ' + start;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());