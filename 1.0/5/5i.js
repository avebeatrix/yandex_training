/* J. Треугольники */

const getDistance = (x1, x2, y1, y2) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

const countMap = (radiusMap) => {
  let result = 0;
  radiusMap.forEach((dots, distance) => {
    if (dots.length > 1) {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const currentDistance = getDistance(
            dots[j][0],
            dots[i][0],
            dots[j][1],
            dots[i][1]
          );
          if (currentDistance < distance * 2) {
            result++;
          }
        }
      }
    }
  });
  return result;
};

const getResult = (data) => {
  const n = parseInt(data[0].trim());
  const dots = [];
  let result = 0;
  for (let i = 1; i <= n; i++) {
    const [x, y] = data[i]
      .trim()
      .split(" ")
      .filter((input) => input != "")
      .map((input) => parseInt(input));
    dots.push([x, y]);
  }
  for (let i = 0; i < n; i++) {
    const radiusMap = new Map();
    for (let j = 0; j < n; j++) {
      if (i === j) continue;

      const distance = getDistance(
        dots[j][0],
        dots[i][0],
        dots[j][1],
        dots[i][1]
      );
      const pointsAtThisDistance = [
        ...(radiusMap.get(distance) || []),
        [dots[j][0], dots[j][1]],
      ];
      radiusMap.set(distance, pointsAtThisDistance);
    }
    result += countMap(radiusMap);
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
