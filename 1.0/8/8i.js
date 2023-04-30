/* I. Родословная: число потомков */
let getResult = (data) => {

	let relationsMap = new Map();
	let all = new Set();
	let N = parseInt(data[0].trim());

	let childMap = new Map();

	for (let i = 1; i < N; i++) {
		let [child, parent] = data[i].trim().split(' ');
		if (!relationsMap.has(parent)) {
			let rootNode = {
				value: parent,
				parent: null,
				childs: [],
			};
			relationsMap.set(parent, rootNode);
			all.add(parent);
		}
		let parentNode = relationsMap.get(parent);
		let childNode;
		if (!relationsMap.has(child)) {
			childNode = {
				value: child,
				parent: parentNode,
				childs: [],
			};
			all.add(child);
			relationsMap.set(child, childNode);
		} else {
			childNode = relationsMap.get(child);
			childNode.parent = parentNode;
		}
		parentNode.childs.push(childNode);			
	}
	[...all].forEach(node_key=>{		
		let node = relationsMap.get(node_key);
		if (node.childs.length===0){
			let counter = 1;
			while (true){
				if (node.parent===null) break;
				if (!childMap.has(node.parent.value)){
					childMap.set(node.parent.value, 0);
				}
				if (node.parent.visited===undefined){	
					childMap.set(node.parent.value, childMap.get(node.parent.value)+counter);				
					counter++;
					node.parent.visited = true;
				}else{
					childMap.set(node.parent.value, childMap.get(node.parent.value)+counter);
				}				
				
				node = node.parent;
			}
		}		
	})	
	
	
	
	let result = [...all].sort().reduce((acc, cur) => {		
		return acc += cur + ' ' + (childMap.get(cur)??0) + '\n';
	}, '');

	return result.trim();
}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());