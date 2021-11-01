/* C. Изготовление палиндромов */
let getResult = (data) => {

	let counter = 0;
	let str = data[0];
	for(let i=0;i<Math.floor(str.length/2);i++){
		if (str[i]!==str[str.length-1-i]){
			counter++;
		}
	}
	return counter;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());