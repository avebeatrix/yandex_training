/* E. Имена */
let getResult = (data) => {
	let sortLetters = (a, b) => {
		if (a > b) {
			return -1;
		} else if (a < b) {
			return 1;
		} else return 0;
	}
	let initMap = (my_arr, my_map) => {
		for (let i = 0; i < my_arr.length; i++) {
			if (my_map.has(my_arr[i])) {
				my_map.set(my_arr[i], my_map.get(my_arr[i]) + 1);
			} else {
				my_map.set(my_arr[i], 1);
			}
		}
		return my_map;
	}
	let getIntersectMap = () => {
		let mapIntersect = new Map();

		let x_arr_sorted = data[0].trim().split('');
		let y_arr_sorted = data[1].trim().split('');
		x_arr_sorted.sort(sortLetters);
		y_arr_sorted.sort(sortLetters);

		let setY = new Set(x_arr_sorted);

		let set_unique = [...new Set(x_arr_sorted)].filter(val => setY.has(val));

		set_unique.forEach((val) => {
			mapIntersect.set(val, 0);
		})
		return mapIntersect;
	}
	let result = '';
	let x_arr = data[0].trim().split('');
	let y_arr = data[1].trim().split('');
	let mapX = initMap(x_arr, new Map());
	let mapY = initMap(y_arr, new Map());
	let mapIntersect = getIntersectMap();
	let pointer_x = 0;
	let pointer_y = 0;
	mapIntersect.forEach((val, key) => {
		mapIntersect.set(key, Math.min(mapX.get(key), mapY.get(key)));
		for (let i = mapIntersect.get(key); i > 0; i--) {
			while (true) {
				mapX.set(x_arr[pointer_x], mapX.get(x_arr[pointer_x]) - 1);
				if (x_arr[pointer_x] == key) {
					pointer_x++;
					break;
				}
				pointer_x++;
			}
			while (true) {
				mapY.set(y_arr[pointer_y], mapY.get(y_arr[pointer_y]) - 1);
				if (y_arr[pointer_y] == key) {
					pointer_y++;
					break;
				}
				pointer_y++;
			}
			result += key;
		}
	})

	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());