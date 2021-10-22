/* C. Второй максимум */
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
			right: null
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
	let toLeftCounter = 0;
	let findSecondMax = (currentNode, isRight = false) => {
		if (currentNode.right !== null) {
			max = Math.max(max, currentNode.right.value);
			return () => findSecondMax(currentNode.right, true);
		} else {
			if (currentNode.left !== null) {
				if (!isRight && currentNode.parent !==null ){
					return currentNode.value;
				}				
				toLeftCounter++;
				if (toLeftCounter>1){
					return currentNode.value;
				}
				return () => findSecondMax(currentNode.left, false);
			}	
			if (isRight){
				if (currentNode.value === max){
					return currentNode.parent.value; 
				}
				return currentNode.value; 				
			}	
			if (currentNode.parent.value ===max ){
				return currentNode.value; 		
			}
			return currentNode.parent.value; 
		}
	}
	let findMySecondMax = trampoline(findSecondMax);

	let addMyNode = trampoline(addNode);
	let digits = [...new Set(parse_ints(data[0]))];
	let tree = addMyNode(digits[0]);
	let max = tree.value;
	for (let i = 1; i < digits.length; i++) {
		if (digits[i] !== 0) {
			addMyNode(digits[i], tree);
		}
	}

	return findMySecondMax(tree);

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());