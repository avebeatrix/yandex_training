/*

B. Пересечение множеств

*/

let getIntersect = (setA, setB) => {
	return [...new Set([...setA].filter(x => setB.has(x)))].sort(function (a, b) {
		return a - b;
	});
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [setA, setB] = fileContent.toString().split("\n").map(line => {
	return new Set(line.trim().split(' ').map(input => parseInt(input)));
});


const result = getIntersect(setA, setB);

fs.writeFileSync("output.txt", result.join(' '));