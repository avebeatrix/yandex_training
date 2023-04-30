/* C. Лучшие друзья девушек - это фуллерены */
let getResult = data => {

	let result = 0;	
	let n = parseInt(data[0].trim());
	let seq = [];
	let pow2 = [];	
	data[1].trim().split(' ').forEach(val=>{
		let tmp = BigInt(val);
		seq.push(tmp);
		pow2.push(tmp*tmp);
	})	
	let n_min_1 = n - 1;

	for (let i = 0; i < n_min_1; i++) {
		let p = i + 1;
		let q = i + 1;
		
		for (let j = i + 1; j < n_min_1; j++) {
			let pow_sum = pow2[i] + pow2[j];
			let sides_sum = seq[i] + seq[j];
		
			while (p < n_min_1 && pow_sum >= pow2[p + 1]) {
				p++;
			}
			q = Math.max(q, p);
			

			while (q < n_min_1 && sides_sum > seq[q + 1]){
				q++;
			}
			result += q - p;
		}
	}
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())

const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

const memoryData = process.memoryUsage()

const memoryUsage = {
                rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
                heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
                heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
                external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
}

console.log(memoryUsage)