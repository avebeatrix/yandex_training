/* D. Бусинки */
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
	let createNewNode = (val, parent = null) => {
		let newnode = {
			val: val,
			childs: [],
			parent: parent
		};
		nodeMap.set(val, newnode);
		ends.add(val);
		return newnode;
	}

	let getChain = (child, arr) => {
		if (parentMap.has(child)) {
			let parent = parentMap.get(child);
			arr.push(parent);
			return () => getChain(parent, arr);
		}
		return arr;
	}
	let getMyChain = trampoline(getChain);


	let nodeMap = new Map();
	let ends = new Set();

	let parentMap = new Map();

	

	let result = 0;

	let n = parseInt(data[0].trim());

	let arr = [];
	for (let i = 1; i < n; i++) {
		let [b1, b2] = data[i].trim().split(' ');
		arr.push([Math.min(b1,b2), Math.max(b1,b2)]);
	}
	
	createNewNode(arr[0][0]);
	for (let i = 0; i < n-1; i++) {
		let [b1, b2] = arr[i];
		let newnode;
		let parent_businka = b1;
		let newval = b2;
		if (!nodeMap.has(b1)) {			
			newval = b1;
			parent_businka = b2;
			if (!nodeMap.has(b2)) {
				newval = b2;
				parent_businka = b1;
				let new_parent_node = createNewNode(parent_businka, null);
				nodeMap.set(parent_businka, new_parent_node);	
			}
		}
		newnode = createNewNode(newval, parent_businka);		
		if (nodeMap.has(parent_businka)){
			nodeMap.get(parent_businka).childs.push(newnode);
			parentMap.set(newnode.val, parent_businka);
		}
		
		nodeMap.set(newnode.val, newnode);		
		ends.delete(parent_businka);
	}

	let lengths = new Map();
	ends.forEach((val) => {
		let l = 0;
		let list = val;		
		while (nodeMap.get(val).parent != null) {
			
			val = nodeMap.get(val).parent;
			l++;
		}
		lengths.set(nodeMap.get(list), l);
	})
	if (lengths.size === 1) {
		lengths.forEach((val) => {
			result += val + 1;
		})

	} else {
		//надо пересекать не 2 цепи самые длинные, а самую длинную и все остальные
		let max1 = 0;
		let max_list1 = 0;

		lengths.forEach((val, key) => {
			if (val > max1) {
				max1 = val;
				max_list1 = key;
			}
		})
		let chain1 = getMyChain(max_list1.val, [max_list1.val]);

		let new_max = 0;
		lengths.forEach((val, key) => {
			if (key.val != max_list1.val) {
				let chain2 = getMyChain(key.val, [key.val]);
				let chain2_set = new Set(chain2);
				let common_point = chain1.filter(val => chain2_set.has(val));

				if (common_point.length == 1) {
					if (chain1.length + chain2.length - 1 > new_max) {
						new_max = chain1.length + chain2.length - 1;
					}
				} else {
					let a = chain1.length;
					let b = chain2.length;
					let c = chain1.length - common_point.length + chain2.length - common_point.length + 1;
					if (c >= a && c >= b && c > new_max) {
						new_max = c;
					} else {
						if (Math.max(a, b) > new_max) {
							new_max = Math.max(a, b);
						}
					}
				}
			}
		})
		result = new_max;

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