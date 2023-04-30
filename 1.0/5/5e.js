/*

E. Красота превыше всего

*/

let getResult = data => {
	let [n, k] = data[0].trim().split(' ').map(input => parseInt(input));
	let trees = data[1].trim().split(' ').map(input => parseInt(input));
	let left_pointer = 0;
	let right_pointer = 0;
	let x = 1;
	let y = n;
	let min_length = n;
	let tree_map = new Map();
	tree_map.set(trees[0], 1);
	while (left_pointer < n && right_pointer < n) {
		while (tree_map.size >= k) {
			let cur_min = right_pointer - left_pointer;
			if (cur_min < min_length) {
				x = left_pointer + 1;
				y = right_pointer + 1;
				min_length = cur_min;

			}
			let count = tree_map.get(trees[left_pointer]);
			if (count == 1) {
				tree_map.delete(trees[left_pointer]);
			} else {
				tree_map.set(trees[left_pointer], count - 1);
			}

			left_pointer++;
		}

		right_pointer++;
		if (right_pointer < n) {
			let next_count = tree_map.get(trees[right_pointer]);
			if (next_count === undefined) {
				tree_map.set(trees[right_pointer], 1);
			} else {
				tree_map.set(trees[right_pointer], next_count + 1);
			}
		}
	}

	return x + ' ' + y;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())