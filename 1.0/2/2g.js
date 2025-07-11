/* G. Наибольшее произведение двух чисел */

const getMaxProductNumbers = (list) => {
  let a_right = false;
  let b_right = false;
  let a_left = false;
  let b_left = false;
  const list_length = list.length;
  let result = [];
  for (let i = 0; i < list_length; i++) {
    if (list[i] > list[a_right] || a_right === false) {
      a_right = i;
    }

    if (list[i] < list[a_left] || a_left === false) {
      a_left = i;
    }
  }
  for (let i = 0; i < list_length; i++) {
    if (
      (b_right === false || list[i] > list[b_right]) &&
      i != a_right &&
      list[i] <= list[a_right]
    ) {
      b_right = i;
    }
    if (
      (b_left === false || list[i] < list[b_left]) &&
      i != a_left &&
      list[i] >= list[a_left]
    ) {
      b_left = i;
    }
  }
  const product_right = list[a_right] * list[b_right];
  const product_left = list[a_left] * list[b_left];
  if (product_right > product_left) {
    if (list[a_right] < list[b_right]) {
      result.push(list[a_right], list[b_right]);
    } else {
      result.push(list[b_right], list[a_right]);
    }
  } else {
    if (list[a_left] < list[b_left]) {
      result.push(list[a_left], list[b_left]);
    } else {
      result.push(list[b_left], list[a_left]);
    }
  }
  return result;
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const list = line.trim().split(" ").map(Number);
  const result = getMaxProductNumbers(list);
  console.log(result.join(" "));
  rl.close();
});
