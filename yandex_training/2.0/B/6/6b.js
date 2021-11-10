/* B. Номер левого и правого вхождения */

let getResult = data => {
    let parse_ints = (str) => str.split(' ').filter(val => val != '').map(val => parseInt(val.trim())) 
    let N = parseInt(data[0]);
    let arr = parse_ints(data[1]);      
    let goals = parse_ints(data[3]);
    
    let checkL = (m, arr, goal) => {
        if (arr[m] < goal) return true;
        return false;
    }
    let checkR = (m, arr, goal) => {
        if (arr[m] <= goal) return true;
        return false;
    }   

    let binarySearchR = (goal, N, arr, check) => {
        let l = 0;
        let r = N;
        while (l < r) {
            let m = Math.floor((r + l + 1) / 2);
            if (check(m, arr, goal)) {
                l = m;
            } else {
                r = m - 1;
            }
        }
        return l;
    }
    let result = [];
    goals.forEach(goal => {
        let left = binarySearchR(goal, N-1, arr, checkL);
        if (left < N && arr[left] !== goal) left++;
        let right = binarySearchR(goal, N-1, arr, checkR);        
        if (arr[left]!==goal){
            result.push('0 0');
        }else{
            result.push((left+1)+' '+(right+1));
        }
    })
    return result.join('\n');
}

let fs = require('fs');
const fileContent = fs.readFileSync('input.txt');
const data = fileContent.toString().trim().split('\n');
const result = getResult(data);
fs.writeFileSync('output.txt', result.toString());