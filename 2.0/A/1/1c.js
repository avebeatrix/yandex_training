/* C. Проверьте правильность ситуации */

let getResult = (data) => {

	let checkLine = val => {
		let wins_counter_1 = 0;
		let wins_counter_2 = 0;
		let set_check = new Set(val);
		if (!set_check.has(0)) {
			if (set_check.size == 1) {
				if (set_check.has(1)) {
					wins_counter_1++;
				} else {
					wins_counter_2++;
				}
			}
		}
		return [wins_counter_1, wins_counter_2];
	}

	let val = [];
	let counter_0 = 0;
	let counter_1 = 0;
	let counter_2 = 0;
	for (let i = 0; i < 3; i++) {
		let str = data[i].trim().split(' ').filter(value => value !== '').map(input => parseInt(input));
		val[i] = [];
		for (let j = 0; j < 3; j++) {
			val[i][j] = str[j];
			if (val[i][j] == 0) {
				counter_0++;
			} else if (val[i][j] == 1) {
				counter_1++;
			} else {
				counter_2++;
			}
		}
	}
	if (counter_2 > counter_1 || counter_2 + 1 < counter_1) {
		return 'NO';
	}
	let wins_counter_1 = 0;
	let wins_intersect = false;
	let wins_counter_2 = 0;
	let check_result = [];
	for (let i = 0; i < 3; i++) {
		check_result.push(checkLine(val[i]));
		check_result.push(checkLine([val[0][i], val[1][i], val[2][i]]));
	}
	check_result.push(checkLine([val[0][0], val[1][1], val[2][2]]));
	check_result.push(checkLine([val[2][0], val[1][1], val[0][2]]));
	let pointer = 0;
	check_result.forEach(val => {
		wins_counter_1 += val[0];
		wins_counter_2 += val[1];
		pointer++;
	})
	if (wins_counter_1 > 1 &&
		(
			check_result[0][0] > 0 || check_result[2][0] > 0 || check_result[4][0] > 0 &&
			check_result[1][0] > 0 || check_result[3][0] > 0 || check_result[5][0] > 0 ||
			(check_result[6][0] > 0 || check_result[7][0]) &&
			(check_result[0][0] > 0 || check_result[2][0] > 0 || check_result[4][0] > 0 ||
				check_result[1][0] > 0 || check_result[3][0] > 0 || check_result[5][0] > 0) ||
			check_result[6][0] > 0 && check_result[7][0] > 0
		) ||
		wins_counter_2 > 1 &&
		(
			check_result[0][1] > 0 || check_result[2][1] > 0 || check_result[4][1] > 0 &&
			check_result[1][1] > 0 || check_result[3][1] > 0 || check_result[5][1] > 0 ||
			(check_result[6][1] > 0 || check_result[7][1]) &&
			(check_result[0][1] > 0 || check_result[2][1] > 0 || check_result[4][1] > 0 ||
				check_result[1][1] > 0 || check_result[3][1] > 0 || check_result[5][1] > 0) ||
			check_result[6][1] > 0 && check_result[7][1] > 0
		)
	){
		wins_intersect = true;
	}

		if (wins_counter_1 > 0 && wins_counter_2 > 0 ||
			wins_counter_1 > 1 && !wins_intersect || wins_counter_2 > 1 && !wins_intersect ||
			wins_counter_1 > 0 && counter_1 == counter_2 ||
			wins_counter_2 > 0 && counter_1 > counter_2
		) {
			return 'NO';
		}
	return 'YES';
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result);