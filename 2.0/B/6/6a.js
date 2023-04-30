/* A. Быстрый поиск в массиве */

let getResult = (data) => {

    let parse_ints = str => {
        return str.split(' ').filter(val => val != '').map(val => parseInt(val.trim()));
    }
    let N = parseInt(data[0]);
    let arr = parse_ints(data[1]);
    let K = parseInt(data[2]);

    arr.sort((a, b) => a - b);

    let checkLeft = (m, goal, arr) => {
        if (arr[m] < goal) return true;
        return false;
    }
    let checkRight = (m, goal, arr) => {
        if (arr[m] > goal) return true;
        return false;
    }
    let binarySearchL = (goal, arr, N, check) => {
        let l = 0;
        let r = N;

        while (l < r) {
            let m = Math.floor((r + l) / 2);
            if (check(m, goal, arr)) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return r;
    }

    let binarySearchR = (goal, arr, N, check) => {
        let l = 0;
        let r = N;

        while (l < r) {
            let m = Math.floor((r + l + 1) / 2);
            if (check(m, goal, arr)) {
                l = m;
            } else {
                r = m - 1;
            }
        }
        return l;
    }

    let result = [];

    for (let i = 0; i < K; i++) {
        let [left, right] = parse_ints(data[i + 3]);
        let left_pos = binarySearchR(left, arr, N - 1, checkLeft);
        if (arr[left_pos]<left && left_pos<N-1) left_pos++;
        let right_pos = binarySearchL(right, arr, N - 1, checkRight);
        if (arr[right_pos]>right && right_pos>0) right_pos--;
        let count = right_pos - left_pos + 1;
        if (arr[left_pos]<left || arr[right_pos]>right) count = 0;
        result.push(count);
    }

    return result.join(' ');
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().trim().split("\n");
const result = getResult(data);
fs.writeFileSync("output.txt", result.toString());

