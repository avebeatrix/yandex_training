/* A. Забавный конфуз */
let getResult = (data) => {		
	let arr_b = data[1].trim().split(' ').map(input=>parseInt(input));	
	return  Math.max.apply(null, arr_b) - Math.min.apply(null, arr_b);
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());