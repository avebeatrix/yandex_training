/* B. Сложите конфетки */
let getResult = (data) => {
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}
	let k = parseInt(data[0]);
	free = [];
	for (let i = 1; i <= k; i++) {
		let [a, n] = parse_ints(data[i]);
		free.push([a, n]);
	}

	let getLeft = () => {
		let res = 0;
		if (left_pointer > 1 && free[left_pointer - 1][1] > 0) {
			free[left_pointer - 1][1] = free[left_pointer - 1][1] - 1;
			return free[left_pointer - 1][0];
		}
		if (free[left_pointer][1] > 0) {
			free[left_pointer][1] = free[left_pointer][1] - 1;
			res = free[left_pointer][0];
			if (free[left_pointer][1] == 0) left_pointer++;
			return res;
		}

		return false;
	}
	let getRight = () => {
		let res = 0;
		if (right_pointer < k - 1 && free[right_pointer + 1][1] > 0) {
			free[right_pointer + 1][1] = free[right_pointer + 1][1] - 1;
			return free[right_pointer - 1][0];
		}
		if (free[right_pointer][1] > 0) {
			free[right_pointer][1] = free[right_pointer][1] - 1;
			res = free[right_pointer][0];
			if (free[right_pointer][1] == 0) right_pointer--;
			return res;
		}
		return false;
	}
	let left_pointer = 0;
	let right_pointer = k - 1;

	let left = getLeft();
	let right = getRight();

	let LH = free[left_pointer][0];
	let RH = free[right_pointer][0];

	let v = 0;
	let need_break = false;

	while (!need_break) {

		if (left_pointer == right_pointer && free[left_pointer][1]==0){
			need_break = true;
		} 
		//инициализация
		if (left == 0 && !need_break) {
			left = LH;
			LH = free[left_pointer][0];
		}
		if (right == 0) {
			if(left_pointer == right_pointer && free[right_pointer][1]<=1){
				need_break = true;
			}else{
				right = RH;
				RH = free[right_pointer][0];
			}			
		}
		if (right != 0) {
			v = Math.min(left, right);

			//обнуление карты
			if (free[left_pointer][1] > 0) free[left_pointer][1] = free[left_pointer][1] - 1;
			if (free[right_pointer][1] > 0) free[right_pointer][1] = free[right_pointer][1] - 1;

			//основные операции
			LH += v;
			left -= v;
			RH += v;
			right -= v;

			//сдвиг указателя
			if (left == 0) {
				if (free[left_pointer][1] == 0 && left_pointer!=right_pointer) {
					left_pointer++;
				}
			}
			if (right == 0) {
				if (free[right_pointer][1] == 0 && right_pointer!=left_pointer) {
					right_pointer--;
				}
			}
		}
	}
	if (left != 0) {
		v = Math.min(left, RH);
		left -= v;
		LH += 2 * v;
		RH -= v;
	} else if (right != 0) {
		v = Math.min(LH, right);
		right -= v;
		RH += 2 * v;
		LH -= v;
	}

	let result = '';
	if (left && LH) {
		result = "2\n" + left + ' ' + LH;
	} else if (LH && RH) {
		result = "2\n" + LH + ' ' + RH;
	} else if (RH && right) {
		result = "2\n" + RH + ' ' + right;
	} else if (LH) {
		result = "1\n" + LH;
	} else if (RH) {
		result = "1\n" + RH;
	}



	return result;

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('start: ' + Date.now());

// const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

// const memoryData = process.memoryUsage()

// const memoryUsage = {
// 	rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
// 	heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
// 	heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
// 	external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
// }

// console.log(memoryUsage)