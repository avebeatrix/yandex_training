//находит 2 максимальных значения в массиве натуральных чисел
let find2MaxNat = arr => {
    let newmax1 = 0;
    let newmax2 = 0;
    arr.forEach(val=>{
        if (val>newmax1){
            newmax2 = newmax1;						
            newmax1 = val;				
        }else if (val>newmax2){
            newmax2 = val;								
        }	
    })
    return [newmax1, newmax2];
}