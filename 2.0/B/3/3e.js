/* E. Автомобильные номера */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let M = parseInt(data[0]);
	let pokazaniya = [];
	for(let i=1;i<=M;i++){
		pokazaniya.push(data[i].trim());
	}

	let N = parseInt(data[M+1]);
	let numbers = [];
	for(let i=M+2;i<=M+1+N;i++){
		numbers.push(data[i].trim());
	}
	let counter = new Array(N).fill(0);
	let max = 0;
	numbers.forEach((number, i)=>{
		number = new Set([...number.split('')]);
		pokazaniya.forEach(pokazanie=>{
			pokazanie = new Set([...pokazanie]);			
			if ([...number].filter(val=>pokazanie.has(val)).length===pokazanie.size){
				counter[i]++;
			}			
		})
		max = Math.max(counter[i], max);
	})
	let result = [];
	counter.forEach((val, i)=>{
		if (val===max){
			result.push(numbers[i]);
		}
	})
	return result.join('\n');
}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());