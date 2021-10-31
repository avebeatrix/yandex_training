/* A. Interactor */
let getResult = (data) => {
	
	let r = parseInt(data[0]);
	let i = parseInt(data[1]);
	let c = parseInt(data[2]);
	
	let result = i;

	if (i===0){
		if (r===0){
			result = c;
		}else{
			result = 3;
		}
	}else if (i===1){
		result = c;
	}else if (i===4){
		if (r===0){
			result = 4;
		}else{
			result = 3;
		}
	}else if (i===6){
		result = 0;
	}else if (i===7){
		result = 1;
	}

	return result;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());