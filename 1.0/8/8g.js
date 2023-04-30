/* G. Вывод веток */
let getResult = (data) => {

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}

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

	let addNode = (val, currentNode = null) => {
		let newnode = {
			value: val,
			parent: currentNode,
			left: null,
			right: null, 
			visited: false
		};

		if (currentNode === null) {
			return newnode;
		} else {
			if (val === currentNode.value) {
				return false;
			}
			if (val < currentNode.value) {			
				if (currentNode.left !== null) {
					return () => addNode(val, currentNode.left);
				} else {
					currentNode.left = newnode;
					return newnode;
				}
			} else {			
				if (currentNode.right !== null) {
					return () => addNode(val, currentNode.right);
				} else {
					currentNode.right = newnode;
					return newnode;
				}
			}
		}
	}
	
	let traverse = (currentNode) => {
			
		if (currentNode.left !== null) {	

			if (currentNode.visited && currentNode.right === null ){
				result.push(currentNode.value);				
			}	
			if (!currentNode.left.visited){
				currentNode.visited = true;		
				return () => traverse(currentNode.left);	
			}			
		}			
		if (currentNode.right !== null) {	
			if (!currentNode.right.visited && currentNode.left === null ){
				result.push(currentNode.value);				
			}			
			if (!currentNode.right.visited){
				currentNode.visited = true;				
				return () => traverse(currentNode.right, false);
			}													
		}
		currentNode.visited = true;	
		if (currentNode.parent!==null){
			return () => traverse(currentNode.parent, false);	
		}		
	}
	let myTraverse = trampoline(traverse);
	let result = [];
	let addMyNode = trampoline(addNode);
	let digits = [...new Set(parse_ints(data[0]))];
	let tree = addMyNode(digits[0]);
	for (let i = 1; i < digits.length; i++) {
		if (digits[i] !== 0) {
			addMyNode(digits[i], tree);
		}
	}
	myTraverse(tree);
	return result.join('\n');

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());