/* B. Родословная: предки и потомки */
let getResult = (data) => {

	let result = '';
	let nodeMap = new Map();

	let n = parseInt(data[0].trim());
	for(let i=1;i<n;i++){
		let [child, parent] = data[i].trim().split(' ');	
		nodeMap.set(child, parent);	
	}

	let checkIsParent = (parent, child) => {	
		while (nodeMap.has(parent)){
			parent = nodeMap.get(parent);
			if (parent==child){
				return true;
			}
		}
		return false;
	}

	for(let i=n;i<data.length;i++){
		let [name1, name2] = data[i].trim().split(' ');		

		if (checkIsParent(name1, name2)){
			result += '2 ';
		}else if (checkIsParent(name2, name1)){
			result += '1 ';
		}else{
			result += '0 ';
		}
	}


	return result.trim();

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());