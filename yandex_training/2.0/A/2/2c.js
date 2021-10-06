/* C. Шахматная доска */

let getResult = (data) => {	
	
	let getCells = () =>{
		let cells = new Set();
		for(let i=1;i<=n;i++){
			let str = data[i].split(' ').filter(input=> input!='').map(input=>parseInt(input));
			cells.add(str[0]+' '+str[1]);
		}
		return cells;
	}
	let countNeighbor = (x, y) => {
		let result = 0;
		if (x>0 && usedCells.has((x-1)+' '+y)){
			result++;
		}		
		if (y>0 && usedCells.has(x+' '+(y-1))){
			result++;
		}
		if (x<8 && usedCells.has((x+1)+' '+y)){
			result++;
		}
		if (y<8 && usedCells.has(x+' '+(y+1))){
			result++;
		}
		return result;
	}
	let n = parseInt(data[0].trim());
	let cells = getCells();
	let usedCells = new Set();	
	let p = 0;	

	cells.forEach(val=>{
		let [x,y] = val.split(' ').map(input=>parseInt(input));
		let neighbor_counter = countNeighbor(x,y);
		p += 4-neighbor_counter;
		p -= neighbor_counter;
		usedCells.add(x+' '+y);
	})

	return p;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());