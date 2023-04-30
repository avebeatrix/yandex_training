/* D. Правильная, круглая, скобочная */
let getResult = (data) => {

	let arr = data[0].split('');
	let balance = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === '(') {
			balance++;
		} else {
			balance--;
		}
		if (balance < 0) {
			return 'NO';
		}
	}
	if (balance!==0){
		return 'NO';
	}

	return 'YES';

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());