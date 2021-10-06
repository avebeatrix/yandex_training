/* C. Проверьте правильность ситуации */

let getResult = (data) => {
	let swap = (a,b) => {
		if (a!=b){
			let tmp = heroes[a];
			heroes[a] = heroes[b];
			heroes[b] = tmp;
			result+=a+' '+b+"\n";			
		}
	}
	let result = '';
	let [n, m] = data[0].split(' ').filter(input => input != '').map(input => parseInt(input));
	let heroes = [];
	for (let i = 1; i <= n; i++) {
		heroes[i] = i;
	}
	for (let i = 0; i < m; i++) {
		let [a, b] = data[i + 1].split(' ').filter(input => input != '').map(input => parseInt(input));
		[heroes[b], heroes[a]] = [heroes[a], heroes[b]];		
	}		

	for (let i=1;i<n;i++){
		if (heroes[i] != i) {
			swap(i, n-1);			
			while (heroes[heroes[n-1]] != i) {
				swap(n-1,heroes[n-1]);
			}
			swap(heroes[n-1], n);
			swap(n, heroes[n]);
			swap(n-1, heroes[n-1]);	
		}		
	}
	
	//поменяем местами 2 последних элемента, если они не на своих местах
	if (heroes[n-1]!=n-1){
		//поменяли местами с предпоследним			
		[heroes[n], heroes[n-1]] = [heroes[n-1], heroes[n]];
		result+=(n-1)+' '+n+"\n";			
	}	
	return result.trim();
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result);