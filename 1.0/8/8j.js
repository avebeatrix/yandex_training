/* J. Родословная: подсчет уровней */
let getResult = (data) => {

	let relationsMap = new Map();
	let all = new Set();
	let N = parseInt(data[0].trim());

	let heightMap = new Map();

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
	setHeight = (node, level) => {
		heightMap.set(node.value, level);
		if (node.childs.length){
			level++;			
			node.childs.forEach(child=>{
				queue.push([child, level]);				
			})
		}		
	}
	let queue = [];
	
	[...all].forEach(node_key=>{		
		let node = relationsMap.get(node_key);
		if (node.parent===null){
			setHeight(node, 0);
		}		
	})	
	let i=0;
	while(i<queue.length){
		let [node, level] = queue[i];
		setHeight(node, level);
		i++;
	}	
	
	
	let result = [...all].sort().reduce((acc, cur) => {		
		return acc += cur + ' ' + (heightMap.get(cur)??0) + '\n';
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