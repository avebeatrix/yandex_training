/* E. Сумма трёх */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let S = parseInt(data[0]);

	let [a_length, ...A] = parse_ints(data[1]);
	let [b_length, ...B] = parse_ints(data[2]);
	let [c_length, ...C] = parse_ints(data[3]);
	let c_set = new Set(C);

	for (let i = 0; i < a_length; i++) {
		for (let j = 0; j < b_length; j++) {
			if (c_set.has(S-A[i]-B[j])){
				for(let k=0;k<c_length;k++){
					if (C[k]===S-A[i]-B[j]){
						return i+' '+j+' '+k;
					}
				}				
			}
		}
	}

	return '-1';
}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("threesum.in", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("threesum.out", result.toString());
//console.log('end: ' + Date.now());