/*

G. Детский праздник

*/

let getResult = data => {
	let gcd = (a, b) => {
		a = Math.abs(a);
		b = Math.abs(b);
		if (b > a) { 
			let temp = a;
			a = b; 
			b = temp; 
		}
		while (true) {
			if (b == 0) return a;
			a %= b;
			if (a == 0) return b;
			b %= a;
		}
	}

	let parse_ints = (line) => {
		return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
	}
	let [M, N] = parse_ints(data[0]);

	let assistans = [];
	let assistans_time_count = [];
	for (let i = 1; i <= N; i++) {
		let [time, count, relax_time] = parse_ints(data[i]);
		assistans.push([time, count, relax_time, time, 0, i - 1]);
		assistans_time_count.push(0);
	}
	assistans.sort((a, b) => {
		let nod = gcd(a[0], b[0]);
		return (nod / a[0]) * (a[0] * a[1] - a[2]) - (nod / b[0]) * (b[0] * b[1] - b[2]);
	})
	let count = 0;
	let time = 0;
	let next_time = 1;
	while (count < M) {
		time = next_time;
		next_time += 101;
		for (let i = 0; i < N; i++) {
			if (assistans[i][3] === time) {
				count++;
				assistans[i][4]++;
				assistans_time_count[assistans[i][5]] = assistans[i][4];
				if (count === M) {
					break;
				}
				if (assistans[i][4] % assistans[i][1] === 0) {
					assistans[i][3] += assistans[i][2]+assistans[i][0];
				} else {
					assistans[i][3] += assistans[i][0];
				}
			}
			next_time = Math.min(next_time, assistans[i][3]);
		}
	}

	let result = time + '\n' + assistans_time_count.join(' ');
	return result.trim();
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())