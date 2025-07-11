/* J. Пробежки по Манхэттену */

const extend = (rect, d) => {
  const [minPlus, maxPlus, minMinus, maxMinus] = rect;
  return [minPlus - d, maxPlus + d, minMinus - d, maxMinus + d];
};

const intersect = (rect1, rect2) => {
  let ans = [
    Math.max(rect1[0], rect2[0]),
    Math.min(rect1[1], rect2[1]),
    Math.max(rect1[2], rect2[2]),
    Math.min(rect1[3], rect2[3]),
  ];
  return ans;
};

const getResult = (data) => {
  const [t, d, n] = data[0].split(" ").map((input) => parseInt(input));
  let posRect = [0, 0, 0, 0];
  for (let i = 0; i < n; i++) {
    posRect = extend(posRect, t);
    const [navX, navY] = data[i + 1].split(" ").map((input) => parseInt(input));
    let navRect = extend(
      [navX + navY, navX + navY, navX - navY, navX - navY],
      d
    );
    posRect = intersect(posRect, navRect);
  }
  points = [];
  for (let xPlusY = posRect[0]; xPlusY < posRect[1] + 1; xPlusY++) {
    for (let xMinusY = posRect[2]; xMinusY < posRect[3] + 1; xMinusY++) {
      if ((xPlusY + xMinusY) % 2 == 0) {
        const x = (xPlusY + xMinusY) / 2;
        const y = xPlusY - x;
        points.push(x + " " + y);
      }
    }
  }
  return (points.length + "\n" + points.join("\n")).trim();
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
