/* E. Another Pair of Triangles */

let getResult = (data) => {
	let p = parseInt(data.trim());
	let p2 = p / 2;
	let max = 0;
	if (p % 2 == 0) {
		max = Math.trunc(p2) - 1;
	} else {
		max = Math.trunc(p2);
	}
	if (max * 3 < p) {
		return '-1';
	}
	let a = max;
	let b, c = 0;
	let bc = p - a;
	if (p % 2 == 0) {
		b = 2;
	}else{
		b=1;
	}
	
	c = p - a - b;
	let min_triangle = [a, b, c];

	let p3 = p / 3;
	a = Math.trunc(p3);
	bc = p - a;	
	if (bc > 2) {
		b = Math.ceil(bc / 2);
	} else {
		b = 1;
	}
	c = p - a - b;
	let max_triangle = [a, b, c];	
	return max_triangle.sort((a,b)=>a-b).join(' ') + "\n" + min_triangle.sort((a,b)=>a-b).join(' ');
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim();

const result = getResult(data);

fs.writeFileSync("output.txt", result);