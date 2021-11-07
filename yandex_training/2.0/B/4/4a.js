/* A. Толя-Карп и новый набор структур, часть 2 */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => BigInt(input));
	}
	
	let N = parseInt(data[0]);
	let colorMap = new Map();
	for(let i=1;i<=N;i++){
		let [color, digit] = parse_ints(data[i]);
		colorMap.set(color, (colorMap.get(color)??0n)+digit);
	}			
	return [...colorMap.entries()].sort((a,b)=>{
		if(a[0] > b[0]) {
			return 1;
		  } else if (a[0] < b[0]){
			return -1;
		  } else {
			return 0;
		  }
	}).map((input)=>input.join(' ')).join('\n');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());