/* B. Сложите конфетки */
let getResult = (data) => {
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}

	let k = parseInt(data[0]);	
	let sweeties = [];
	for (let i = 1; i <= k; i++) {
		let [a, n] = parse_ints(data[i]);
		if (k===1 && n===1){
			return `${k}\n${a}`;
		}
		sweeties.push([a, n]);		
	}

	let left_pointer = 0;
	let right_pointer = k-1;

	let A = sweeties[left_pointer][0];
	sweeties[left_pointer][1]--;
	let B = 0;
	if (sweeties[left_pointer][1]>0){
		B = A;	
		sweeties[left_pointer][1]--;	
	}else{
		if (left_pointer<right_pointer){
			left_pointer++;
			B = sweeties[left_pointer][0];
			sweeties[left_pointer][1]--;	
		}else{
			B = A;
			A = 0;
		}					
	}
	if (sweeties[left_pointer][1]===0 && left_pointer<right_pointer){
		left_pointer++;
	}

	let D = sweeties[right_pointer][0];
	sweeties[right_pointer][1]--;
	let C = 0;
	if (sweeties[right_pointer][1]>0){
		C = D;	
		sweeties[right_pointer][1]--;	
	}else{
		if (left_pointer<right_pointer){
			right_pointer--;
			C = sweeties[right_pointer][0];	
			sweeties[right_pointer][1]--;
		}else{
			C = D;
			D = 0;
		}					
	}
	if (sweeties[right_pointer][1]===0 && left_pointer<right_pointer){
		right_pointer--;
	}
	
	while (true) {
		if (A!==0 && B!==0 && C!==0 && D!==0){			
			let count = Math.min(A, D);
			A -= count;
			B += count;
			C += count;
			D -= count;

			if (A===0){
				if (sweeties[left_pointer][1]>0){
					sweeties[left_pointer][1]--;
					A = B;
					B = sweeties[left_pointer][0];
					if (sweeties[left_pointer][1]===0 && left_pointer<right_pointer){
						left_pointer++;
					}
				}else{
					if (left_pointer<right_pointer){
						left_pointer++;
						sweeties[left_pointer][1]--;
						A = B;
						B = sweeties[left_pointer][0];
						if (sweeties[left_pointer][1]===0 && left_pointer<right_pointer){
							left_pointer++;
						}
					}
				}
			}
			if (D===0){
				if (sweeties[right_pointer][1]>0){
					sweeties[right_pointer][1]--;
					D = C;
					C = sweeties[right_pointer][0];
					if (sweeties[right_pointer][1]===0 && left_pointer<right_pointer){
						right_pointer--;
					}
				}else{
					if (left_pointer<right_pointer){
						right_pointer--;
						sweeties[right_pointer][1]--;
						D = C;
						C = sweeties[right_pointer][0];
						if (sweeties[right_pointer][1]===0 && left_pointer<right_pointer){
							right_pointer--;
						}
					}
				}
			}			
		}else if (A===0 && D===0){
			return `2\n${B} ${C}`;
		}else if(A===0){
			let count = Math.min(B, D);
			B -= count;
			C += count*2;
			D -= count;			

			if (B===0 && D===0){
				return `1\n${C}`;
			}else if (B===0){
				return `2\n${C} ${D}`;
			}else{
				return `2\n${B} ${C}`;
			}
		}else if(D===0){
			let count = Math.min(A, C);
			A -= count;
			B += count*2;
			C -= count;			

			if (A===0 && C ===0){
				return `1\n${B}`;
			}else if (A===0){
				return `2\n${B} ${C}`;
			}else{
				return `2\n${A} ${B}`;
			}
		}else if (B===0){
			return `1\n${C}`;
		}else if(C===0){
			return `1\n${B}`;
		}
					
	}	

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