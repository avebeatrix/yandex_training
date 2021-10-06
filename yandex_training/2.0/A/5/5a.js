/* A. Стильная одежда 2 */
let getResult = (data) => {
	let prepare = (line) => {
		return [...new Set(line.trim().split(' ').filter(input => input != '').map(input => parseInt(input)).sort((a, b) => a - b))];
	}

	let A = prepare(data[1]);
	let B = prepare(data[3]);
	let C = prepare(data[5]);
	let D = prepare(data[7]);

	let pointerA = 0;
	let pointerB = 0;
	let pointerC = 0;
	let pointerD = 0;

	let goalA = 0;
	let goalB = 0;
	let goalC = 0;
	let goalD = 0;

	let left_limit = 0;
	let right_limit = 0;

	let getDiff = () => {
		right_limit = Math.max(A[pointerA], B[pointerB], C[pointerC], D[pointerD]);
		left_limit = Math.min(A[pointerA], B[pointerB], C[pointerC], D[pointerD]);
		return right_limit - left_limit;
	}
	let diff;
	let min = 100001;

	let findVal_L = (arr, start, right_limit) => {
		while (arr[start] < right_limit) {
			start++;
		}
		let result = start;
		if (arr[result] == right_limit) return result;
		for (let i = start - 1; i >= 0; i--) {
			if (arr[i] < right_limit) return i;
		}
		return result;
	}
	let findVal_R = (arr, start, left_limit) => {

		while (arr[start] > left_limit) {
			start--;
		}
		let result = start;
		if (arr[result] == left_limit) return result;
		for (let i = start + 1; i < arr.length; i++) {
			if (arr[i] > left_limit) return i;
		}
		return result;
	}

	//A
	for (let i = 0; i < A.length; i++) {
		pointerA = i;
		//если это правая граница, найдем все указатели ниже значения A[i]		
		pointerB = findVal_L(B, pointerB, A[i]);
		pointerC = findVal_L(C, pointerC, A[i]);
		pointerD = findVal_L(D, pointerD, A[i]);
		diff = getDiff();
		if (diff < min) {
			min = diff;
			goalA = i;
			goalB = pointerB;
			goalC = pointerC;
			goalD = pointerD;
		}
		//если это правая граница, найдем все указатели выше значения A[i]
		pointerB = findVal_R(B, pointerB, A[i]);
		pointerC = findVal_R(C, pointerC, A[i]);
		pointerD = findVal_R(D, pointerD, A[i]);
		diff = getDiff();
		if (diff < min) {
			min = diff;
			goalA = i;
			goalB = pointerB;
			goalC = pointerC;
			goalD = pointerD;
		}
	}
	//B
	pointerA = 0;
	pointerB = 0;
	pointerC = 0;
	pointerD = 0;
	for (let i = 0; i < B.length; i++) {
		pointerB = i;
		//если это правая граница, найдем все указатели ниже значения A[i]		
		pointerA = findVal_L(A, pointerA, B[i]);
		pointerC = findVal_L(C, pointerC, B[i]);
		pointerD = findVal_L(D, pointerD, B[i]);
		diff = getDiff();
		if (diff < min) {
			min = diff;
			goalA = pointerA;
			goalB = i;
			goalC = pointerC;
			goalD = pointerD;
		}
		//если это правая граница, найдем все указатели выше значения A[i]
		pointerA = findVal_R(A, pointerA, B[i]);
		pointerC = findVal_R(C, pointerC, B[i]);
		pointerD = findVal_R(D, pointerD, B[i]);
		diff = getDiff();
		if (diff < min) {
			min = diff;
			goalA = pointerA;
			goalB = i;
			goalC = pointerC;
			goalD = pointerD;
		}
	}

	//C
	pointerA = 0;
	pointerB = 0;
	pointerC = 0
	pointerD = 0;
	for (let i = 0; i < C.length; i++) {
		pointerC = i;
		//если это правая граница, найдем все указатели ниже значения A[i]		
		pointerA = findVal_L(A, pointerA, C[i]);
		pointerB = findVal_L(B, pointerB, C[i]);
		pointerD = findVal_L(D, pointerD, C[i]);
		diff = getDiff();
		if (diff < min) {
			min = diff;
			goalA = pointerA;
			goalB = pointerB;
			goalC = i
			goalD = pointerD;
		}
		//если это правая граница, найдем все указатели выше значения A[i]
		pointerA = findVal_L(A, pointerA, C[i]);
		pointerB = findVal_L(B, pointerB, C[i]);
		pointerD = findVal_L(D, pointerD, C[i]);
		diff = getDiff();
		if (diff < min) {
			min = diff;
			goalA = pointerA;
			goalB = pointerB;
			goalC = i
			goalD = pointerD;
		}
	}

	//D
	pointerA = 0;
	pointerB = 0;
	pointerC = 0;
	pointerD = 0;
	for (let i = 0; i < D.length; i++) {
		pointerD = i;
		//если это правая граница, найдем все указатели ниже значения A[i]		
		pointerA = findVal_L(A, pointerA, D[i]);
		pointerB = findVal_L(B, pointerB, D[i]);
		pointerC = findVal_L(C, pointerC, D[i]);
		diff = getDiff();
		if (diff < min) {
			min = diff;
			goalA = pointerA;
			goalB = pointerB;
			goalC = pointerC;
			goalD = i;
		}
		//если это правая граница, найдем все указатели выше значения A[i]
		pointerA = findVal_L(A, pointerA, D[i]);
		pointerB = findVal_L(B, pointerB, D[i]);
		pointerC = findVal_L(C, pointerC, D[i]);
		diff = getDiff();
		if (diff < min) {
			min = diff;
			goalA = pointerA;
			goalB = pointerB;
			goalC = pointerC;
			goalD = i;
		}
	}

	return A[goalA] + ' ' + B[goalB] + ' ' + C[goalC] + ' ' + D[goalD];

}
//console.log('start: ' + Date.now());
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
//console.log('end: ' + Date.now());

