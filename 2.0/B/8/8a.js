/* A. Бинарное дерево (вставка, поиск, обход) */
let getResult = (data) => {

	//remaining code stays the same
	function trampoline(fn) {
		return function (...args) {
			let result = fn(...args);

			while (result && typeof result === 'function') {
				result = result();
			}

			return result;
		};
	}

	let traverse = (node, result = '', level = 0, flag) => {
		if (node!==null){
			if (node['left'] !== null && node['left']['visited']===flag) {
				return () => traverse(node['left'], result, level + 1, flag);
			}	
			if (node['visited']===flag){
				node['visited'] = !flag;	
				result += new Array(level).fill('.').join('') + node['val'] + '\n';							
			}
			if (node['right'] !== null && node['right']['visited']===flag) {
				return () => traverse(node['right'], result, level + 1, flag);
			}
			if (node['parent']!==null){			
				return () => traverse(node['parent'], result, level - 1, flag);
			}
		}
		return result;
	}
	let myTraverse = trampoline(traverse);


	let findNode = (val, currentNode) => {
		if (currentNode!==null){
			if (val === currentNode['val']) {
				return currentNode;
			}
			if (val < currentNode['val'] && currentNode['left'] !== null) {
				return () => findNode(val, currentNode['left']);
			} else if (currentNode['right'] !== null) {
				return () => findNode(val, currentNode['right']);
			} else {
				return false;
			}
		}
		return false;
	}
	let findMyNode = trampoline(findNode);

	let addNode = (val, currentNode, flag) => {
		let newnode = [];
		newnode['val'] = val;
		newnode['parent'] = currentNode;
		newnode['left'] = null;
		newnode['right'] = null;
		newnode['visited'] = flag;

		if (currentNode === null) {
			tree = newnode;
			return newnode;
		} else {
			if (val === currentNode['val']) {
				return false;
			}
			if (val < currentNode['val']) {
				if (currentNode['left'] !== null) {
					return () => addNode(val, currentNode['left'], flag);
				} else {
					currentNode['left'] = newnode;
					return newnode;
				}
			} else {
				if (currentNode['right'] !== null) {
					return () => addNode(val, currentNode['right'], flag);
				} else {
					currentNode['right'] = newnode;
					return newnode;
				}
			}
		}
	}

	let addMyNode = trampoline(addNode);

	let tree = null;
	let flag = false;
	let result = '';
	for (let i = 0; i < data.length; i++) {
		let [command, num] = data[i].trim().split(' ');
		num = parseInt(num);
		switch (command) {
			case 'ADD':
				if (addMyNode(num, tree, flag) === false) {
					result += 'ALREADY\n';
				} else {
					result += 'DONE\n';
				}
				break;
			case 'SEARCH':
				if (findMyNode(num, tree)) {
					result += 'YES\n';
				} else {
					result += 'NO\n';
				}
				break;
			case 'PRINTTREE':
					result += myTraverse(tree, '', 0, flag);
					flag = !flag;
				break;
			default:
				break;
		}
	}



	return result;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());