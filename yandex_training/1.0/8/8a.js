/* A. Высота дерева */
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

	let addNode = (val, currentNode = null, level = 1) => {
		let newnode = {
			value: val,
			parent: currentNode,
			left: null,
			right: null
		};

		if (currentNode === null) {
			return newnode;
		} else {
			if (val === currentNode.value) {
				return false;
			}
			if (val < currentNode.value) {
				level++;
				height = Math.max(height, level);
				if (currentNode.left !== null) {										
					return () => addNode(val, currentNode.left, level);
				} else {
					currentNode.left = newnode;
					return newnode;
				}
			} else {
				level++;
				height = Math.max(height, level);
				if (currentNode.right !== null) {					
					return () => addNode(val, currentNode.right, level);
				} else {
					currentNode.right = newnode;
					return newnode;
				}
			}
		}
	}

	let addMyNode = trampoline(addNode);
	let height = 0;
	let digits = [...new Set(parse_ints(data[0]))];
	let tree = addMyNode(digits[0]);
	for(let i=1;i<digits.length;i++){
		if (digits[i] !== 0) {			
			addMyNode(digits[i], tree);
		}
	}	

	return height;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());