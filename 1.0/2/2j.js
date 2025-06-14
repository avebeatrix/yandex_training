/* J. Треугольник Максима */

const getInterval = (data) => {
  let left = 30.0;
  let right = 4000.0;
  let prev = parseFloat(data[1].trim());

  for (let i = 2; i < data.length; i++) {
    const [nextStr, distance] = data[i].trim().split(" ");
    const next = parseFloat(nextStr);
    const mid = (prev + next) / 2.0;

    if (distance === "closer") {
      if (next > prev) {
        left = Math.max(left, mid);
      } else if (next < prev) {
        right = Math.min(right, mid);
      }
    } else if (distance === "further") {
      if (next > prev) {
        right = Math.min(right, mid);
      } else if (next < prev) {
        left = Math.max(left, mid);
      }
    }

    prev = next;
  }

  return [left, right];
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
  const result = getInterval(data);
  console.log(result[0].toFixed(6) + " " + result[1].toFixed(6));
  rl.close();
});
