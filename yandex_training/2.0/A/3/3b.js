/* B. Мультиграф */
let getResult = (data) => {
 
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}
 
	let [n, m] = parse_ints(data[0])
 
	let edges = new Set();
 
	for(let i=1;i<=m;i++){
		let [from, to] = parse_ints(data[i])
		if (from > to) {
			let tmp = from;
			from = to;
			to = tmp;
		}
		if (from < to) {
			edges.add(from + ' ' + to);
		}
	}
 
	var result = n + " " + edges.size + "\n";
	result += Array.from(edges).join('\n'); 
 
	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("multigraph.in", "utf8");
const data = fileContent.toString().trim().split("\n");
const result = getResult(data);
fs.writeFileSync("multigraph.out", result);