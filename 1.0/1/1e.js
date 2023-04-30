/* E. Скорая помощь */
let getEntranceAndFloor = (flatno, flatsonfloor, floors) => {
	let floorsbefore = Math.floor((flatno - 1) / flatsonfloor);
	let entrance = Math.floor(floorsbefore / floors) + 1;
	let floor = floorsbefore % floors + 1;
	return [entrance, floor];
}

let check = (k1, m, k2, p2, n2, flatsonfloor) => {

	let [entrance2, floor2] = getEntranceAndFloor(k2, flatsonfloor, m);
	if (entrance2 == p2 && floor2 == n2) {
		return getEntranceAndFloor(k1, flatsonfloor, m);
	}
	return [-1, -1];
}

let findSolutions = (k1, m, k2, p2, n2) => {
	let ent = -1;
	let floor = -1;
	let goodFlag = false;
	for (let i = 1; i <= 1000000; i++) {
		let [nent, nfloor] = check(k1, m, k2, p2, n2, i);
		if (nent != -1) {
			goodFlag = true;
			if (ent == -1) {
				ent = nent;
				floor = nfloor;
			}
			else if ((ent != nent) && (ent != 0)) {
				ent = 0;
			}
			else if ((floor != nfloor) && (floor != 0)) {
				floor = 0;
			}
		}
	}
	if (goodFlag) {

		return ent + ' ' + floor;
	} else {
		return '-1 -1';
	}
}


const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [k1, m, k2, p2, n2] = fileContent.toString().split(" ").map(input => {
	return parseInt(input);
});
const result = findSolutions(k1, m, k2, p2, n2);

fs.writeFileSync("output.txt", result);