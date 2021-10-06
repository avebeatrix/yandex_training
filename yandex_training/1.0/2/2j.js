/*

J. Треугольник Максима

*/

let getInterval = (data) => {
	let x = [30, 4000];
	let length = parseInt(data[0].trim());
	let current = parseFloat(data[1].trim());
	let next, distance;
	let diff = 0;
	let [newLeft, newRight] = x;
	for (let i = 2; i <= length; i++) {
		[next, distance] = data[i].trim().toString().split(" ");
		next = parseFloat(next);
		diff = Math.abs((next - current) / 2);
		if (distance == 'further') {
			if (next - current > 0) {
				newRight = current + diff;
			} else {
				newLeft = current - diff;
			}
		} else {
			if (next - current > 0) {
				newLeft = next - diff;
			} else {
				newRight = next + diff;
			}
		}
		if (newRight < x[1]) x[1] = newRight;
		if (newLeft > x[0]) x[0] = newLeft;
		current = next;
	}
	return x;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split("\n");

const result = getInterval(data);

fs.writeFileSync("output.txt", result.join(' '));