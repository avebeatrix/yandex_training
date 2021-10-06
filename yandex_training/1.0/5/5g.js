/*

G. Счет в гипершашках

*/
let getMap = seq => {	
	let countMap = new Map();
	seq.forEach(val => {
		let oldcount = countMap.get(val);
		if (oldcount === undefined) {
			countMap.set(val, 1);
		} else {
			countMap.set(val, oldcount + 1);
		}
	})
	return countMap;
}


let getResult = data => {
	let [length, k] = data[0].trim().split(' ').map(input => parseInt(input));
	let seq = data[1].trim().split(' ').map(input => parseInt(input));
	let countMap = getMap(seq);
	let unique = [...new Set(seq)].sort((a, b) => a - b);
	let result = 0;
	let p = 0;
	let summator = [];
	let sum = 0;
	unique.forEach((val, index) => {
		if (countMap.get(val) > 1) {
			sum++;
		}
		summator[index] = sum;
	})
	for (let l = 0; l < unique.length; l++) {
		if (p == l) { p++ }
		while (p < unique.length && unique[l] * k >= unique[p]) {
			p++;
		}
		let kolvo_for_2 = p - 1 - l;
		let kolvo_for_3 = p - 2 - l;
		if (countMap.get(unique[l]) > 2) {
			result += 1;
		}
		if (l < unique.length - 1) {			
			if (countMap.get(unique[l]) >= 2 && kolvo_for_2 > 0) {
				//надо добрать второе число						
				result += kolvo_for_2 * 3;
			}
			//добрать комбинации из 3 разных чисел			
			result += ((kolvo_for_2-1 + 1)*(kolvo_for_2-1)) * 3;			

			//добавить варианты, где второе число 2 раза
			let tmp = summator[p - 1] - summator[l];
			if (tmp > 0) {
				result += tmp * 3;
			}

		}

	}

	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())