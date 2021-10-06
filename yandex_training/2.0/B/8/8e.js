/* E. Дерево Хаффмана */
let getResult = (data) => {
	let k = 1;
	let addNode = (currentNode = null, code = false) => {
		let newnode = [];
		newnode['val'] = k;
		k++;
		newnode['parent'] = currentNode;
		newnode['left'] = null;
		newnode['right'] = null;
		newnode['visited'] = false;

		if (currentNode === null) {
			tree = newnode;
		} else {
			if (code == 'D') {
				currentNode['left'] = newnode;
				newnode['parent'] = currentNode;
			} else if (code == 'U') {
				let parent = currentNode['parent'];
				while (parent['right']!==null){
					parent = parent['parent'];
				}
				parent['right'] = newnode;
				newnode['parent'] = parent;
			}
		}
		return newnode;
	}

	function trampoline(fn) {
		return function (...args) {
			let result = fn(...args);

			while (result && typeof result === 'function') {
				result = result();
			}

			return result;
		};
	}
	let result = [];
	let traverse = (node, prefix = '') => {

		if (node['left'] !== null && node['left']['visited'] === false) {
			prefix += '0';
			node['left']['visited'] = true;
			return () => traverse(node['left'], prefix);
		}
		if (node['right'] !== null && node['right']['visited'] === false) {
			prefix += '1';
			node['right']['visited'] = true;
			return () => traverse(node['right'], prefix);
		}
		if (node['left'] === null && node['right'] === null) {
			result[result.length-1].push(prefix);
			
		}
		if (prefix.length>=1){
			prefix = prefix.slice(0, prefix.length - 1);
		}		

		if (node['parent'] !== null) {
			node['parent']['visited'] = true;
			return () => traverse(node['parent'], prefix);
		}

	}

	let myTraverse = trampoline(traverse);


	let n = parseInt(data[0].trim());
	for (let i = 1; i <= n; i++) {
		result.push([]);		
		let codes = data[i].trim().split('');

		let root = addNode();
		let current_node = root;
		for (let j = 0; j < codes.length; j++) {
			current_node = addNode(current_node, codes[j]);
		}
		myTraverse(root);
		
	}
	let final = '';
	result.forEach(val=>{
		final+=val.length+'\n'+val.join('\n')+'\n';
		
	})

	return final.trim();

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());