/* H. Охрана */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let k = null;
let currentTest = 0;
let results = [];

function processResult(line) {
  const parts = line.trim().split(" ");
  const N = parseInt(parts[0]);

  const events = [];
  for (let j = 1; j <= N * 2; j += 2) {
    const start = parseInt(parts[j]);
    const end = parseInt(parts[j + 1]);
    const index = (j - 1) / 2;

    events.push([start, -1, index]);
    events.push([end, 1, index]);
  }

  events.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  });

  const good = new Set();
  const current = new Set();

  if (events[0][0] !== 0 || events[events.length - 1][0] < 10000) {
    return false;
  }

  let goodFlag = true;
  let prevTime = -1;

  for (const event of events) {
    if (event[0] !== 0 && current.size === 0) {
      goodFlag = false;
      break;
    }

    if (current.size === 1 && event[0] !== prevTime) {
      for (const val of current) {
        good.add(val);
      }
    }

    if (event[1] === -1) {
      current.add(event[2]);
    } else {
      current.delete(event[2]);
    }

    prevTime = event[0];
  }

  if (events[events.length - 1][0] !== 10000) {
    goodFlag = false;
  }

  return goodFlag && good.size === N;
}

rl.on("line", (line) => {
  if (k === null) {
    k = parseInt(line.trim());
    return;
  }

  currentTest++;
  const result = processResult(line);
  results.push(result ? "Accepted" : "Wrong Answer");

  if (currentTest === k) {
    console.log(results.join("\n"));
    rl.close();
  }
});
