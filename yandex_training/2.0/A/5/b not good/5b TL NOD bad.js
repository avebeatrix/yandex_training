/* B. Сложите конфетки */
let getResult = (data) => {
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}

	let cutDigitL = () => {
		let [a, n] = free[left_pointer];
		if (n > 0) {
			free[left_pointer] = [a, n - 1];
		} else {
			left_pointer++;
			if (left_pointer > free.length - 1) return false;
			[a, n] = free[left_pointer];
			if (n > 0) {
				free[left_pointer] = [a, n - 1];
			} else {
				return false;
			}
		}
		all_count--;
		return a;
	}

	let cutDigitR = () => {
		let [a, n] = free[right_pointer];
		if (n > 0) {
			free[right_pointer] = [a, n - 1];
		} else {
			right_pointer--;
			if (right_pointer < 0) return false;
			[a, n] = free[right_pointer];
			if (n > 0) {
				free[right_pointer] = [a, n - 1];
			} else {
				return false;
			}
		}
		all_count--;
		return a;
	}

	let k = parseInt(data[0]);
	let all_count = 0;
	let free = [];

	for (let i = 1; i <= k; i++) {
		let [a, n] = parse_ints(data[i]);
		free.push([a, n]);
		all_count += n;
	}
	console.log(all_count);

	function NOD() {
		for (var x = arguments[0], i = 1; i < arguments.length; i++) {
			var y = arguments[i];
			while (x && y) {
				x > y ? x %= y : y %= x;
			}
			x += y;
		}
		return x;
	}
	all_count = 0;
	free = [];
	let limit = Math.floor(k / 2);
	for (let i = 1; i <= limit; i++) {
		let [a, n] = parse_ints(data[i]);
		let [a2, n2] = parse_ints(data[k - i + 1]);
		let nod = NOD(n, n2);
		if (n == n2) {
			free[i - 1] = [a * n, 1];
			free[k - i] = [a2 * n2, 1];
			all_count += 2;
		} else if (nod > 1) {
			free[i - 1] = [a * n / nod, nod];
			free[k - i] = [a2 * n2 / nod, nod];
			all_count += nod*2;
		} else {
			free[i - 1] = [a, n];
			free[k - i] = [a2, n2];
			all_count += n+n2;
		}
		
	}
	if (k % 2 == 1) {
		let [a, n] = parse_ints(data[limit + 1]);
		free[limit] = [a, n];
		all_count += n;
	}
	console.log(all_count);

	let left_pointer = 0;
	let right_pointer = k - 1;

	let apL = 0;
	let apR = 0;

	let arr_left = [];
	arr_left.push(cutDigitL());

	let arr_right = [];
	arr_right.push(cutDigitR());


	//пока есть неразобранные кучи
	while (all_count > 0 || apL < arr_left.length - 1 || apR < arr_right.length - 1) {
		let move_count = Math.min(arr_left[apL], arr_right[apR]);
		//обработка левого массива
		if (arr_left.length <= apL + 1) {
			let add_to_left = cutDigitL();
			if (add_to_left !== false) {
				arr_left.push(add_to_left);
				arr_left[apL] -= move_count;
				arr_left[apL + 1] += move_count;
				if (arr_left[apL] == 0) {
					apL++;
				}
			} else {
				//переложим в правый массив
				arr_left[apL] -= move_count;
				arr_right[arr_right.length - 1] += move_count;
			}
		} else {
			arr_left[apL] -= move_count;
			arr_left[apL + 1] += move_count;
			if (arr_left[apL] == 0) {
				apL++;
			}
		}
		//обработка правого массива
		if (arr_right.length <= apR + 1) {
			let add_to_right = cutDigitR();
			if (add_to_right !== false) {
				arr_right.push(add_to_right);
				arr_right[apR] -= move_count;
				arr_right[apR + 1] += move_count;
				if (arr_right[apR] == 0) {
					apR++;
				}
			} else {
				//переложим в левый массив
				arr_right[apR] -= move_count;
				arr_left[arr_left.length - 1] += move_count;
			}
		} else {
			arr_right[apR] -= move_count;
			arr_right[apR + 1] += move_count;
			if (arr_right[apR] == 0) {
				apR++;
			}
		}
	}

	let a = arr_left[arr_left.length - 2];
	let b = arr_left[arr_left.length - 1];
	let c = arr_right[arr_right.length - 2];
	let d = arr_right[arr_right.length - 1];
	let result = '';
	if (a !== undefined && a !== 0) {
		result = "2\n" + a + ' ' + b;
	} else if (c !== undefined && c !== 0) {
		result = "2\n" + c + ' ' + d;
	} else if (b !== 0 && d !== 0) {
		result = "2\n" + b + ' ' + d;
	} else if (b !== 0) {
		result = "1\n" + b;
	} else {
		result = "1\n" + d;
	}


	return result;

}
let start = Date.now();
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
console.log('time: ' + (Date.now() - start));

const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

const memoryData = process.memoryUsage()

const memoryUsage = {
	rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
	heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
	heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
	external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
}

console.log(memoryUsage)