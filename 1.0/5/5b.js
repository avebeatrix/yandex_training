/*

B. Сумма номеров

*/

let getResult = data => {
	let result = 0;
	let [n, k] = data[0].trim().split(' ').map(input => parseInt(input));
	let nums = data[1].trim().split(' ').map(input => parseInt(input));
	let summator = 0;
	let summator_pointer = 0;
	for (let i = 0; i < n; i++) {
		summator += nums[i];
		if (summator > k) {
			while (summator > k) {
				summator -= nums[summator_pointer];
				summator_pointer++;
			}
		}
		if (summator == k) {
			result++;
		}
	}

	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())