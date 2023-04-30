/* E. Покрытие K отрезками */

let getResult = (data) => {

    let parse_ints = (str) => str.split(' ').filter(val => val != '').map(val => parseInt(val.trim()));
    let [n, k] = parse_ints(data[0]);
    let x = parse_ints(data[1]);
    x.sort((a, b) => a - b);  

    let check = (m, x, n, k) => {
        let otr_start = x[0];
        let count = 1;
        for(let i = 1; i < n; i++){
            if (x[i] - otr_start > m){
                otr_start = x[i];
                count++;
            }
        }      
        if (count <= k) {
            return true;
        }        
        
        return false;
    }   
    
    let lBinarySearch = (l, r, x, n, k, check) => {
        while (l < r) {
            let m = Math.floor((r + l) / 2);
            if (check(m, x, n, k)) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    }

       
    let result = lBinarySearch(0, x[x.length-1] - x[0], x, n, k, check);

    return result;
}

let fs = require('fs');
const fileContent = fs.readFileSync('input.txt');
const data = fileContent.toString().split('\n');
const result = getResult(data);
fs.writeFileSync('output.txt', result.toString());