/* B. Изобретательный Петя */

let getIntersectCount = (str1, str2) => {	
	let common_length = 0;	
	for(let i=str1.length-str2.length;i<str1.length;i++){
		let a = str1.substring(i);
		let b = str2.substring(0, a.length);
		if (a==b){
			common_length = a.length;	
			break;		
		}			
	}
	return common_length;
}
let getResult = (data) => {		
	let x = data[0].trim();	
	let z = data[1].trim();
	if (x==''){
		return z;
	}
	let y = '';
	let end_of_z = '';
	let can_be_all_x = true;
	let can_be_cut = false;
	
	if (z.length>x.length){
		let split = z.split(x);
		end_of_z = split[split.length-1];
		split.forEach((element, index) => {
			if (index == 0){
				let p = x.length-element.length;
				let x_last = x.substring(p);
				if (element.length<=x.length && x_last==element){
					can_be_cut = true;
				}
			}
			if (index!=0 && index!=[split.length-1] && element!=''){
				can_be_all_x = false;
				can_be_cut = false;
			}		
		});		
	}else{
		//если есть общее пересечение, то заполним end_of_z, иначе вернем z
		let common_length = getIntersectCount(x,z);
		if (common_length){
			can_be_cut = true;
			if (common_length!=z.length){							
				end_of_z = z.substring(common_length);				
			}			
		}else{
			can_be_all_x = false;
		}
		
	}	
	
	
	if(end_of_z==''){
		if (can_be_all_x){
			if (can_be_cut){
				
			}else{
				y = z;
			}
		}else{
			y = z;
		}
	}else{
		if(can_be_all_x){
			if (can_be_cut){
				y = end_of_z;
			}else{
				y = z;
			}
		}else{
			y = z;
		}
	}			
	
	return y;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().split("\n");

const result = getResult(data);

fs.writeFileSync("output.txt", result.toString());