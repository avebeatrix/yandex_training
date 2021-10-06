/* D. Петя, Маша и верёвочки */

let getResult = (data) => {		
	let n = parseInt(data[0].trim());
	let ropes = data[1].trim().split(' ').filter(input => input!='').map(input=>parseInt(input));
	let max = 0;
	let map_counter = new Map();
	let all_sum = 0;
	ropes.forEach(val => {
		if (val>max) max = val;
		let count = map_counter.get(val);
		if (count===undefined){
			map_counter.set(val, 1);
		}else{
			map_counter.set(val, count+1);
		}
		all_sum+=val;
	});
	if (map_counter.get(max)>1 || max-(all_sum-max)<1){
		return all_sum;
	}else{
		return max-(all_sum-max);
	}
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());