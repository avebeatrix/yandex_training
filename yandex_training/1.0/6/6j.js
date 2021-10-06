/*

J. Медиана объединения

*/

let getResult = data => {
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}

	let check = (m, checkparams) => {
		let [seq1, seq2, L] = checkparams;
		let count = 0;
		let left_pointer = 0;
		let right_pointer = 0;
		let curval = -30001;
		while(curval<=m){
			if (seq1[left_pointer]>m && seq2[right_pointer]>m) break;
			if (seq1[left_pointer]<seq2[right_pointer]){
				curval = seq1[left_pointer];
				left_pointer++;
				count++;				
			}else if (seq1[left_pointer]>seq2[right_pointer]){
				curval = seq2[right_pointer];
				right_pointer++;
				count++;				
			}else {
				curval = seq1[left_pointer];
				count+=2;
				left_pointer++;
				right_pointer++;
				
			}
		}
		if (count<L) return false;
		return true;
	}
	let lLeftSearch = (l, r, check, checkparams) => {
		while (l < r) {
			let m = Math.floor((r + l) / 2);
			if (check(m, checkparams)) {
				r = m;
			} else {
				l = m + 1;
			}
		}

		return l;
	}
	let [N, L] = parse_ints(data[0]);
	let seqs = [];	
	for (let i = 1; i <= N; i++) {
		let seq = parse_ints(data[i]);		
		seqs.push(seq);
	}	
	let result = '';
	for(let i=0;i<N;i++){
		for(let j=i+1;j<N;j++){
			result += lLeftSearch(Math.min(...seqs[i], ...seqs[j]), Math.max(...seqs[i], ...seqs[j]), check, [seqs[i], seqs[j], L])+'\n';
		}
	}
	
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())