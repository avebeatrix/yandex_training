/* D. Скобки */
let getResult = (data) => {
	let result = 0;
	let diff = []	
	let cur_diff = 0;
	let i = 0;
	let arr = data[0].split('');
	let len = arr.length;
	arr.forEach(val => {		
		if (val == '(') {
			cur_diff++;				
		} else {	
			cur_diff--;				
		}
		diff.push(cur_diff);
		if (i>0){
			if (diff[i-1]>=1){				
				result +=len-i+1;	
			}else if (diff[i-1]>=0){				
				result+= len-i; 
			}
		}	
		i++;
	})
	result+=2*len+1; 	

	let j = 0;
	i = 1;
	while(i<len){	
		if (diff[i-1]>=1) {			
			if (j<i+1){
				j = i+1;
			}
			while(j<len){
				if (diff[len-1] - diff[j-1] > -1) {
					break;
				}						
				j++;
			}	
			result+=((j-i)/2*(j-1-i));	
			i=j;		
		}
		i++;
	}
	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());
