/* D. Угадай число */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let N = parseInt(data[0]);
	
	let posibleNumbers = new Set();
	let queueDelete = new Set();
	
	let i=1;
	while (true){
		if (data[i]==='HELP'){
			break;
		}
		let question = new Set(parse_ints(data[i]));
		i++;
		let answer = data[i].trim();
		i++;		
		if (answer==='YES'){		
			if (posibleNumbers.size===0){
				posibleNumbers = new Set([...question]);
			}else{				
				posibleNumbers = new Set([...question].filter(val=>posibleNumbers.has(val)));
			}			
		}else{	
			question.forEach(val=>{
				posibleNumbers.delete(val);
				queueDelete.add(val);		
			})		
						
		}
	}	
	if (posibleNumbers.size===0){
		for(let i=1;i<=N;i++){
			if (!queueDelete.has(i)){
				posibleNumbers.add(i);
			}
		}
	}	
	return [...posibleNumbers].sort((a,b)=>a-b).join(' ');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());