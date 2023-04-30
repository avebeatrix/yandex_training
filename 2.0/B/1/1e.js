/* E. Точка и треугольник */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let d = parseInt(data[0]);
	let [x, y] = parse_ints(data[1]);

	if (y<=d-x && x<=d && y<=d && x>=0 && y>=0){
		return 0;
	}

	let a_length = Math.sqrt(x**2 + y**2);
	let b_length = Math.sqrt((x-d)**2 + y**2);
	let c_length = Math.sqrt(x**2 + (y - d)**2);

	let min_length = Math.min(a_length, b_length, c_length);
	if (min_length===a_length){
		return '1';
	}else if (min_length===b_length){
		return '2';
	}else return '3';	
}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());