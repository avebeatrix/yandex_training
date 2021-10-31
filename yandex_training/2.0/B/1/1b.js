/* B. Кольцевая линия метро */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	
	let [N, i ,j] = parse_ints(data[0]);
		
	return Math.min(Math.abs(j-i)-1, Math.min(i,j)-1+N-Math.max(i,j));

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());