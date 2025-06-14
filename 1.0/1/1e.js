/* E. Скорая помощь */
const getEntranceAndFloor = (flatno, flatsOnFloor, floors) => {
  let floorsBefore = Math.floor((flatno - 1) / flatsOnFloor);
  let entrance = Math.floor(floorsBefore / floors) + 1;
  let floor = (floorsBefore % floors) + 1;
  return [entrance, floor];
};

const check = (k1, m, k2, p2, n2, flatsOnFloor) => {
  const [entrance2, floor2] = getEntranceAndFloor(k2, flatsOnFloor, m);
  if (entrance2 == p2 && floor2 == n2) {
    return getEntranceAndFloor(k1, flatsOnFloor, m);
  }
  return [-1, -1];
};

const findSolutions = (k1, m, k2, p2, n2) => {
  let ent = -1;
  let floor = -1;
  let goodFlag = false;

  const maxFlats = Math.max(k1, k2);
  for (let i = 1; i <= maxFlats; i++) {
    const [nent, nfloor] = check(k1, m, k2, p2, n2, i);
    if (nent != -1) {
      goodFlag = true;
      if (ent == -1) {
        ent = nent;
        floor = nfloor;
      } else if (ent != nent && ent != 0) {
        ent = 0;
      } else if (floor != nfloor && floor != 0) {
        floor = 0;
      }
    }
  }
  if (goodFlag) {
    return ent + " " + floor;
  } else {
    return "-1 -1";
  }
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [k1, m, k2, p2, n2] = line.split(" ").map(Number);
  const result = findSolutions(k1, m, k2, p2, n2);
  console.log(result);
  rl.close();
});
