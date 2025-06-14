/* D. Количество слов в тексте */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  const fileContent = input.join("\n");

  const words = fileContent
    .replace(/\r/gi, " ")
    .replace(/\n/gi, " ")
    .split(" ");

  const wordsSet = new Set();
  for (let i = 0; i < words.length; i++) {
    if (words[i].length) {
      wordsSet.add(words[i]);
    }
  }

  const result = wordsSet.size;

  console.log(result);
});
