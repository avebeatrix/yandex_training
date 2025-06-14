/* F. Инопланетный геном */

const getResult = (data) => {
  const first = [...data[0].trim()];
  const second = [...data[1].trim()];
  const secondSet = new Set();
  let result = 0;
  for (let i = 1; i < second.length; i++) {
    secondSet.add(second[i - 1] + second[i]);
  }
  for (let i = 1; i < first.length; i++) {
    if (secondSet.has(first[i - 1] + first[i])) {
      result++;
    }
  }

  return result;
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
