/* G. Черепахи */

const getResult = (data) => {
  const length = parseInt(data[0].trim());
  const validPositions = new Set();

  for (let i = 1; i <= length; i++) {
    const [a, b] = data[i]
      .trim()
      .split(" ")
      .map((input) => parseInt(input));

    // Проверяем, что черепаха может говорить правду
    if (a >= 0 && b >= 0 && a + b === length - 1) {
      validPositions.add(a);
    }
  }

  return validPositions.size;
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data = [];
rl.on("line", (line) => {
  data.push(line.trim());
});

rl.on("close", () => {
  const result = getResult(data);
  console.log(result.toString());
  rl.close();
});
