/* B. Параллелограмм */

let getResult = (data) => {
	let n = parseInt(data[0].trim());
	let result = '';
	for (l = 1; l <= n; l++) {
		let dots = data[l].trim().split(" ").filter(input=>{return input!=''}).map(input => parseInt(input));
		let x = [];
		let y = [];
		for (let i=0;i<8;i++){
			if(i%2==0){
				x.push(dots[i]);
			}else{
				y.push(dots[i]);
			}			
		}
		let pointer = 0;
		let k = [];
		let m = [];
		for(let i=0;i<4;i++){
			for(let j=i+1;j<4;j++){
				if(x[i]!=x[j]){
					k[pointer] = (y[j]-y[i])/(x[j]-x[i]);
					m[pointer] = y[i]-k[pointer]*x[i];
				}else{
					k[pointer] = false;
					m[pointer] = false;
				}
				pointer++;
			}
		}
		let pairs_counter = 0;
		for(let i=0;i<k.length;i++){
			for(let j=i+1;j<k.length;j++){
				if (k[i]==k[j]){
					if (k[i]==false || m[i] != m[j]){
						pairs_counter++;
					}					
				}
			}
		}

		if(pairs_counter==2){
			result += "YES\n";
		}else{
			result += "NO\n";
		}
	}
	return result.trim();
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result);