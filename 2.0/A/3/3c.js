/* C. Забастовки */
let getResult = (data) => {
	let bad_days = new Set();
	let [n,k] = data[0].trim().split(' ').filter(input => input!='').map(input=>parseInt(input));
	for(let i=1;i<=k;i++){
		let [start, repeat] = data[i].trim().split(' ').filter(input=> input!='').map(input=>parseInt(input));
		for(let j=start;j<=n;j++){
			if ((j+1)%7==0|| j%7==0){

			}else{
				if ((j-start)%repeat ==0 ){
					bad_days.add(j);
				}
			}
		}
	}
	
	return bad_days.size.toString();
}
const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().trim().split("\n");
const result = getResult(data);
fs.writeFileSync("output.txt", result);