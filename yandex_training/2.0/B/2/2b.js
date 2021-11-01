/* B. Дома и магазины */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let fillLengths = (numbers) => {
		let current_shop_index = -1;
		let lengths = new Array(numbers.length).fill(numbers.length);
		numbers.forEach((number, index) => {
			if (number===1){
				if (current_shop_index!==-1){
					lengths[index] = index-current_shop_index;
				}
			}else if (number===2){
				current_shop_index = index;
			}		
		});
		return lengths;
	}

	let numbers = parse_ints(data[0]);
			
	let max = 0;
	let left_lengths = fillLengths(numbers);
	numbers.reverse();
	let right_lengths = fillLengths(numbers).reverse();
	numbers.reverse();
	numbers.forEach((number, index) => {
		if (number===1){
			max = Math.max(max, Math.min(left_lengths[index], right_lengths[index]));
		}
	})

	return max;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());