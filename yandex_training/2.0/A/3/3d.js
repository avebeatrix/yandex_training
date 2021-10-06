/* D. Жребий Крижановского */
let getResult = (data) => {

	let getWinnerScore = last_game => {
		//создадим map подсчета кол-ва названных чисел, какое число сколько раз в последней игре назвали
		let last_game_map = new Map();
		last_game.forEach(val => {
			if (last_game_map.has(val)) {
				last_game_map.set(val, last_game_map.get(val) + 1);
			} else {
				last_game_map.set(val, 1);
			}
		})
		//узнаем кол-во баллов, дающее победу в последней игре	
		let winner_value_in_last_game = false;
		for (let i = 1; i <= 101; i++) {
			if (last_game_map.has(i)) {
				if (last_game_map.get(i) == 1 && winner_value_in_last_game === false) {
					winner_value_in_last_game = i;
					break;
				}
			}
		}
		return winner_value_in_last_game;
	}

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(input => input != '').map(input => parseInt(input));
	}

	let [n] = parse_ints(data[0]);
	let score = parse_ints(data[1]);
	let last_game = parse_ints(data[2]);

	let loosers = [];
	let winners = [];
	let goal_vals = [];
	for (let i = 1; i <= 101; i++) {
		//делаем предположение относительно числа, которое мог назвать Петя
		last_game.push(i);
		//получаем финальный счет
		let winner_score = getWinnerScore(last_game);
		let final_score = [];
		last_game.forEach((val, index) => {
			if (val == winner_score) {
				final_score[index] = score[index] + val;
			} else {
				final_score[index] = score[index];
			}
		})
		//считаем кол-во участников, получивших баллы ниже и выше Пети
		let counter_worst = 0;
		let counter_better = 0;
		final_score.forEach(val => {
			if (val < final_score[n - 1]) {
				counter_worst++;
			} else if (val > final_score[n - 1]) {
				counter_better++;
			}

		})
		loosers.push(counter_worst);
		winners.push(counter_better);
		goal_vals.push(i);

		last_game.pop();
	}
	let max_loosers = Math.max(...loosers.sort((a, b) => { a - b }));
	let result = false;
	let win_count = 0;
	for (let i = 0; i < loosers.length; i++) {
		if (loosers[i] == max_loosers &&
			(result === false || goal_vals[i] < result ||
				max_loosers > 0 && goal_vals[i] > result && win_count > winners[i])) {
			result = goal_vals[i];
			win_count = winners[i];
		}
	}

	return result.toString();
}
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().trim().split("\n");
const result = getResult(data);
fs.writeFileSync("output.txt", result);