/* D. Вырубка леса */

let getResult = (data) => {

    let parse_ints = (str) => str.split(' ').filter(val => val != '').map(val => BigInt(val.trim()));
    let [A, K, B, M, X] = parse_ints(data[0]);

    const LIMIT = BigInt(10 ** 20);

    let check = (m, A, K, B, M, X) => {
        let tree_count = A * (m - m / K) + B * (m - m / M);
        if (tree_count >= X) {
            return true;
        }
        return false;
    }

    let lBinarySearch = (l, r, A, K, B, M, X, check) => {
        while (l < r) {
            let m = (r + l) / 2n;
            if (check(m, A, K, B, M, X)) {
                r = m;
            } else {
                l = m + 1n;
            }
        }
        return l;
    }

    let result = lBinarySearch(0n, LIMIT, A, K, B, M, X, check);

    return result;
}

let fs = require('fs');
const fileContent = fs.readFileSync('input.txt');
const data = fileContent.toString().split('\n');
const result = getResult(data);
fs.writeFileSync('output.txt', result.toString());