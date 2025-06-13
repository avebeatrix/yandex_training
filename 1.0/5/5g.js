/* G. Счет в гипершашках */
const getMap = (seq) => {
  const countMap = new Map();
  seq.forEach((val) => {
    countMap.set(val, (countMap.get(val) ?? 0) + 1);
  });
  return countMap;
};

const getResult = (data) => {
  const [, k] = data[0]
    .trim()
    .split(" ")
    .map((input) => parseInt(input));
  const seq = data[1]
    .trim()
    .split(" ")
    .map((input) => parseInt(input));
  const countMap = getMap(seq);
  const unique = [...new Set(seq)].sort((a, b) => a - b);
  let result = 0;
  let p = 0;
  const summator = [];
  let sum = 0;
  unique.forEach((val, index) => {
    if (countMap.get(val) > 1) {
      sum++;
    }
    summator[index] = sum;
  });
  for (let l = 0; l < unique.length; l++) {
    if (p == l) {
      p++;
    }
    while (p < unique.length && unique[l] * k >= unique[p]) {
      p++;
    }
    const countForTwo = p - 1 - l;
    if (countMap.get(unique[l]) > 2) {
      result += 1;
    }
    if (l < unique.length - 1) {
      if (countMap.get(unique[l]) >= 2 && countForTwo > 0) {
        //надо добрать второе число
        result += countForTwo * 3;
      }
      //добрать комбинации из 3 разных чисел
      result += (countForTwo - 1 + 1) * (countForTwo - 1) * 3;

      //добавить варианты, где второе число 2 раза
      const tmp = summator[p - 1] - summator[l];
      if (tmp > 0) {
        result += tmp * 3;
      }
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
