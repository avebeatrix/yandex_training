/* B. Встречалось ли число раньше */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	
	let setA = parse_ints(data[0]);
	let mySet = new Set();
	let result = [];
	setA.forEach(val=>{
		if (mySet.has(val)){
			result.push('YES');
		}else{
			result.push('NO');
		}
		mySet.add(val);
	})

	return result.join('\n');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());