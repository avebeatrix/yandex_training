/* A. Количество равных максимальному */
let getResult = (data) => {
	
	let numbers = data.map(val=>parseInt(val));
	
	let max = 0;
	numbers.forEach(number => {
		max = Math.max(max, number);
	});
	let result = 0;
	numbers.forEach(number => {
		if (number===max){
			result++;
		}
	});
	return result;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());