/* C. Родословная: LCA */
let getResult = (data) => {

	function trampoline(fn) {
		return function (...args) {
			let result = fn(...args);

			while (result && typeof result === 'function') {
				result = result();
			}

			return result;
		};
	}

	let result = '';
	let nodeMap = new Map();

	let n = parseInt(data[0].trim());
	for (let i = 1; i < n; i++) {
		let [child, parent] = data[i].trim().split(' ');
		nodeMap.set(child, parent);
	}

	let getChain = (child, arr) => {
		if (nodeMap.has(child)) {
			let parent = nodeMap.get(child);
			arr.push(parent);
			return () => getChain(parent, arr);
		}
		return arr;
	}
	let getMyChain = trampoline(getChain);

	for (let i = n; i < data.length; i++) {
		let [name1, name2] = data[i].trim().split(' ');

		let chain1 = getMyChain(name1, [name1]);
		let chain2 = getMyChain(name2, [name2]);
		let pointer1 = 0;
		let pointer2 = 0;
		
		while (pointer1<chain1.length && pointer2<chain2.length){
			while (chain1.length - pointer1 < chain2.length - pointer2) {
				pointer2++;				
			}
			while (chain1.length - pointer1 > chain2.length - pointer2) {
				pointer1++;				
			}
			if (chain2[pointer2] === chain1[pointer1]) {
				result += chain1[pointer1] + '\n';
				break;
			}
			pointer1++;
			pointer2++;
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