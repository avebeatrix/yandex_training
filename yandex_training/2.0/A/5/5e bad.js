/* E. Странные строки */
let getResult = (data) => {
	
	let arr = data[0].split('');	
	let differentLetters = new Set(arr);
	let result = differentLetters.size; 
	let used = new Set();	

	if (arr.length>1){
		let sum = [1];
		let cur_char = arr[0];
		let i = 1;		
		while(sum.length<arr.length){
			if (arr[i]==cur_char){
				sum.push(sum[sum.length-1]);
			}else{
				cur_char = arr[i];
				sum.push(sum[sum.length-1]+1);
			}
			i++;
		}		
		
		let L = 0;
		let P = 1;
		while(L<arr.length-1){	
			if (!(P== arr.length-1 && sum[P]-sum[L]==0)){			
				while(sum[P]-sum[L]<=1 && P <arr.length){
					if (!used.has(data[0].substring(L,P+1))){
						result++;
						used.add(data[0].substring(L,P+1));
					}					
					P++;
				}
			}else if((P== arr.length-1 && sum[P]-sum[L]==0)){
				if (!used.has(data[0].substring(L,P+1))){
					result++;
					used.add(data[0].substring(L,P+1));		
				}		
			}		
					
			L++;
			if (!(P== arr.length-1 && sum[P]-sum[L]==0)){	
				if(P>L+1){
					P--;
				}			
			}
		}

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