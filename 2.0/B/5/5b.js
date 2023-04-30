/* B. Максимальная сумма */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}

	let n = parseInt(data[0]);
	let arr = parse_ints(data[1]);
	let max = -Infinity;

	let sum = 0;
	let current_sum = null;
	let left = 0
	let right = 0;

	while (right < n) {
		sum += arr[right];
		if (current_sum !== null && sum > current_sum && current_sum < 0 && left != right) {
			current_sum = sum;
			max = Math.max(current_sum, max);
			sum -= arr[left];
			left++;
			sum -= arr[right];
			right--;
		}
		current_sum = sum;

		max = Math.max(current_sum, max);
		right++;
	}

	return max;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());