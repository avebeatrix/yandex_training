/*

A. Двоичный поиск

*/


let getResult = data => {
	let parse_ints = (line) => {
		return line.trim().split(' ').map(input => parseInt(input));
	}
	let lBinSearch = (arr, n, b) => {
		let l = 0;
		let r = n-1;
		while (l<r){
			let m = Math.floor((r+l)/2);
			if (arr[m]<b){
				l = m+1;				
			}else{
				r = m;
			}
		}
		if (arr[l]==b){
			return true;
		}else{
			return false;
		}		
	}
	let [n,k] = parse_ints(data[0]);
	let x_arr =  parse_ints(data[1]);
	let y_arr =  parse_ints(data[2]);
	let result = '';
	y_arr.forEach(val =>{
		if (lBinSearch(x_arr,n,val)){
			result+="YES\n";
		}else{
			result+="NO\n";
		}
	})

	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())