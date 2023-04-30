/* B. Треугольник */
let isTriangle = (a, b, c) => {
	if (a + b > c && a + c > b && b + c > a)
		return 'YES';
	return 'NO';
}


const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [a, b, c] = fileContent.toString().split("\n");
const result = isTriangle(parseInt(a), parseInt(b), parseInt(c));

fs.writeFileSync("output.txt", result.toString());