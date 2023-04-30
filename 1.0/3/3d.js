/*

D. Количество слов в тексте

*/

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
let words = fileContent.toString().replace(/\r/gi, ' ').replace(/\n/gi, ' ').split(" ");
let wordsSet = new Set();
for (let i = 0; i < words.length; i++) {
	if (words[i].length) {
		wordsSet.add(words[i]);
	}
}

const result = wordsSet.size;

fs.writeFileSync("output.txt", result.toString());