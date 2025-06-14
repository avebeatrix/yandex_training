/* F. Симметричная последовательность */

const getSymmetricTail = (list) => {
  const list_length = list.length;
  const result = [];
  for (let start = 0; start < list_length; start++) {
    let i = start;
    let j = list_length - 1;
    while (i < list_length && j >= 0 && list[i] == list[j] && i <= j) {
      i++;
      j--;
    }
    if (i > j) {
      for (let k = start - 1; k > -1; k--) {
        result.push(list[k]);
      }
      return result;
    }
  }
  return result;
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0;
let n = 0;
let list = [];

rl.on("line", (line) => {
  if (lineCount === 0) {
    n = parseInt(line);
  } else if (lineCount === 1) {
    if (line.trim()) {
      list = line.trim().split(" ").map(Number);
    }

    const result = getSymmetricTail(list);
    console.log(result.length);
    if (result.length > 0) {
      console.log(result.join(" "));
    }

    rl.close();
  }
  lineCount++;
});
