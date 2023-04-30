/* E. Фибоначчи возвращается */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(input => input != '').map(input => parseInt(input));
	}

	let [n] = parse_ints(data[0]);
	let fibSet = new Set();
	let a = BigInt(1);
	let b = BigInt(1);
	fibSet.add(a);
	for(let i=0;i<35000;i++){
		let bi = BigInt(a+b);
		fibSet.add(BigInt(a+b));
		a = b;
		b = bi;		
	}
	let result = '';
	for(let i=1;i<=n;i++){
		let cur = BigInt(data[i].trim());
		if(fibSet.has(cur)){
			result+="Yes\n";
		}else{
			result+="No\n";
		}
	}
	

	return result.trim();
}
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().trim().split("\n");
const result = getResult(data);
fs.writeFileSync("output.txt", result);