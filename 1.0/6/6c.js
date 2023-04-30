/*

C. Дипломы

*/


let getResult = data => {
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}
	let check = (m, checkparams) => {
		let [w, h, n] = checkparams;
		if (w*Math.floor(m/w) * h*Math.floor(m/h) >=w*h*n){
			return true;
		}else return false;
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
	let [w, h, n] = parse_ints(data[0]);
	
	let result = lLeftSearch(0, n * h, check, [w,h,n])	
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())