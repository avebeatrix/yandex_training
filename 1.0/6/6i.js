/*

I. Субботник

*/

let getResult = data => {

	let check = (m, checkparams) => {
		let [arr, R, C] = checkparams;
		let count = 0;
		for(let i=C-1; i < arr.length; i++){
			if (arr[i]-arr[i-C+1]<=m){
				count++;
				i+=C-1;
			}
			if (count>=R) break;
		}
		if (count>=R) return true;
		return false;
	}
	let lLeftSearch = (l, r, check, checkparams) => {
		while (l < r) {
			let m = Math.floor((r + l) / 2);
			if (check(m, checkparams)) {
				r = m;
			} else {
				l = m + 1;
			}
		}

		return l;
	}
	let [N, R, C] = data[0].trim().split(' ').map(input => parseInt(input.trim()));
	let arr = [];	
	for (let i = 1; i <= N; i++) {
		let val = parseInt(data[i].trim());		
		arr.push(val);
		
	}
	arr.sort((a,b)=>a-b);	

	let result = lLeftSearch(0, 1000000001, check, [arr, R, C]);
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())