/*

J. Треугольники

*/


let getResult = data => {
	let getLength = (x1,x2,y1,y2) =>{
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}
	let countMap = radius_map => {		
		let result = 0;
		radius_map.forEach((dots, length) => {
			if (dots.length>1){
				for(let i=0;i<dots.length;i++){
					for(let j=i+1;j<dots.length;j++){						
						let l = getLength(dots[j][0], dots[i][0], dots[j][1], dots[i][1]);	
						if (l<length*2){
							result++;
						}														
					}
				}				
			}
		})
		return result;
	}

	let n = parseInt(data[0].trim());
	let dots = [];
	let result = 0;
	for (let i = 1; i <= n; i++) {
		let [x, y] = data[i].trim().split(' ').filter(input => input != '').map(input => parseInt(input));
		dots.push([x, y]);
	}
	for (i = 0; i < n; i++) {
		let radius_map = new Map();		
		for (let j = 0; j < n; j++) {
			if (i != j) {
				let length = getLength(dots[j][0], dots[i][0], dots[j][1], dots[i][1]);				
				let this_length_arr;
				if (radius_map.has(length)) {
					this_length_arr = radius_map.get(length);
					this_length_arr.push([dots[j][0], dots[j][1]]);					
				}else{
					this_length_arr = [];
					this_length_arr.push([dots[j][0], dots[j][1]])					
				}
				radius_map.set(length, this_length_arr);
			}
		}
		result += countMap(radius_map);
	}

	return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());