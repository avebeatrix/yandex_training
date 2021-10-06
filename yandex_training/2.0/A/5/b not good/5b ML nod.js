/* B. Сложите конфетки */
let getResult = (data) => {
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}
	let k = parseInt(data[0].trim());
	let sweet = [];
	let p = 0;
	let test = 0;

	function NOD () {
		for (var x = arguments[0], i = 1; i < arguments.length; i++) {
		  var y = arguments[i];
		  while (x && y) {
			x > y ? x %= y : y %= x;
		  }
		  x += y;
		}
		return x;
	  }

	let sweet_optimized = [];
	let limit = Math.floor(k/2);
	for (let i = 1; i <= limit; i++) {
		let [a, n] = parse_ints(data[i]);
		let [a2, n2] = parse_ints(data[k-i+1]);
		let nod = NOD(n,n2);
		if (nod>1){
			sweet_optimized[i-1] = [a*n/nod, nod];
			sweet_optimized[k-i] = [a2*n2/nod, nod];
		}else{
			sweet_optimized[i-1] = [a,n];
			sweet_optimized[k-i] = [a2, n2];			
		}				
		//console.log(a+' '+n+' '+a2+' '+n2+' : '+sweet_optimized[i-1]+' '+sweet_optimized[k-i])
	}
	if (k%2==1){
		let [a, n] = parse_ints(data[limit+1]);
		sweet_optimized[limit] = [a,n];
	}


	for (let i = 0; i < sweet_optimized.length; i++) {
		
		let [a, n] = sweet_optimized[i];	
		
		
		for (let j = 0; j < n; j++) {
			sweet.push(a);
			p++;
		}
	}	
	let result = '';
	let left_pointer = 0;
	let right_pointer = sweet.length - 1;	
	while (right_pointer - left_pointer > 1) {
		let move_count = Math.min(sweet[left_pointer], sweet[right_pointer]);
		sweet[left_pointer + 1] += move_count;
		sweet[left_pointer] -= move_count;
		sweet[right_pointer - 1] += move_count;
		sweet[right_pointer] -= move_count;
		if (sweet[left_pointer] == 0) {
			left_pointer++;
		}
		if (sweet[right_pointer] == 0) {
			right_pointer--;
		}
	}
	result = right_pointer - left_pointer + 1 + "\n";
	if (right_pointer - left_pointer > 0) {
		result += sweet[left_pointer] + ' ' + sweet[right_pointer];
	} else {
		result += sweet[left_pointer];
	}

	return result;

}
let start = Date.now();
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());

console.log('time: ' + (Date.now() - start));

const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

const memoryData = process.memoryUsage()

const memoryUsage = {
                rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
                heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
                heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
                external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
}

console.log(memoryUsage)