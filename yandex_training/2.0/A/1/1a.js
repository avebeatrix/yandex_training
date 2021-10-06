/* A. Сложное уравнение */
let getResult = (a,b,c,d) => {		
	if(a==0 && b==0){
		return 'INF';
	}else if (a!=0 && b==0){
		if (d!=0){
			return '0';
		}
	}else if (a!=0){
		let x = -b/a;		
		if (Math.trunc(x)==x && (c*x+d)!=0){
			return x.toString();
		}
	}
	return 'NO';
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const [a,b,c,d] = fileContent.toString().trim().split("\n").map(input=>{	
	return parseInt(input);
});

const result = getResult(a,b,c,d);

fs.writeFileSync("output.txt", result);