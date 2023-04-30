/*

C. Рассадка в аудитории

*/


let getResult = data => {
	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let events = [];
	let [N, D] = parse_ints(data[0]);
	let students = parse_ints(data[1]);	
	let student_indexes = [];	
	students.forEach((X, index)=>{		
		events.push([X, 0, index]);
		events.push([X-D, 1]);
		events.push([X+D, -1]);
		student_indexes[X] = index;
	})
	events.sort((a,b)=>{
		if (a[0]==b[0]){
			return b[1] - a[1];
		}
		return a[0]-b[0];
	})
	
	let result = [];
	let min_speakers = 1;	
	let real_speakers = 0;
	events.forEach(event => {
		if (event[1] === 0) {
			real_speakers++;
			min_speakers = Math.max(min_speakers,  real_speakers);
		}else if (event[1] === -1) {			
			real_speakers--;
		}		
	})
	students.sort((a,b)=>a-b);
	let counter = 1;
	students.forEach(student=>{
		result[student_indexes[student]] = counter;
		counter++;
		if (counter>min_speakers) counter = 1;
	})

	return min_speakers+'\n'+result.join(' ').trim();
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())