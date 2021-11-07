/* B. Выборы в США */
let getResult = (data) => {	
		
	let voteMap = new Map();
	data.forEach(str=>{
		let [name, count] = str.split(' ');	
		voteMap.set(name, (voteMap.get(name)??0)+parseInt(count));
	})			
	return [...voteMap.entries()].sort().map((input)=>input.join(' ')).join('\n');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());