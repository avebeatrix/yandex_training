/** 11. Конвейер */
const parse_floats = (line) => {
  return line
    .trim()
    .split(" ")
    .filter((val) => val != "")
    .map((input) => parseFloat(input));
};

let getResult = (data) => {
  const testCount = parseInt(data[0].trim());
  const result = [];

  for (let i = 0; i < testCount; i++) {
    const [, ...containers] = parse_floats(data[i + 1]);
    const warehouseStack = [];
    const bStack = [];
    for (let j = 0; j < containers.length; j++) {
      const container = containers[j];
      while (
        warehouseStack.length &&
        warehouseStack.at(-1) < container &&
        (warehouseStack.at(-1) >= bStack.at(-1) || !bStack.length)
      ) {
        bStack.push(warehouseStack.pop());
      }
      if (bStack.length && bStack.at(-1) > container) {
        result.push(0);
        break;
      }
      warehouseStack.push(container);
    }
    if (result.length === i + 1) {
      continue;
    }
    while (warehouseStack.length) {
      if (bStack.length && warehouseStack.at(-1) < bStack.at(-1)) {
        result.push(0);
        break;
      }
      bStack.push(warehouseStack.pop());
    }
    if (result.length < i + 1) {
      result.push(1);
    }
  }
  return result;
};

const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.join("\n"));
