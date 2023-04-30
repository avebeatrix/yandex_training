/* C. Уникальные элементы */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	
	let setA = parse_ints(data[0]);
	let mySet = new Set();
	let dublicates = new Set();
	setA.forEach(val=>{
		if (mySet.has(val)){	
			dublicates.add(val);		
		}else{
			mySet.add(val);
		}		
	})

	return setA.filter(val=>!dublicates.has(val)).join(' ');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());