/* C. Частотный анализ */
let getResult = (data) => {	
		
	let frequencyMap = new Map();
	data.forEach(str=>{	
		let words = str.split(' ').map(val=>val.trim());	
		words.forEach(word=>{
			frequencyMap.set(word, (frequencyMap.get(word)??0)+1);
		})		
	})			
	return [...frequencyMap.entries()].sort((a, b)=>{
		if (a[1]==b[1]){
			if (a[0]>b[0]){
				return 1;
			}else if (a[0]<b[0]){
				return -1;
			}
			return 0;			
		}else{
			return b[1]-a[1];
		}
	}).map((input)=>input[0]).join('\n');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());