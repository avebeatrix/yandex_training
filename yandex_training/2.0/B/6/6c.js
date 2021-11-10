/* C. Корень кубического уравнения */

let getResult = (data) => {

    let parse_ints = (str) => str.split(' ').filter(val => val != '').map(val => parseInt(val.trim()));
    let [a, b, c, d] = parse_ints(data[0]);

    const LIMIT = 10 ** 9;

    let getFloat = (integer, decimal, a) => {
        if (a >= 0) {
            return integer - decimal / LIMIT;
        } else {
            return integer + decimal / LIMIT;
        }
    }

    let calculateCub = (x, a, b, c, d) => a * x ** 3 + b * x ** 2 + c * x + d;

    let checkCub = (x, a, b, c, d, integer = null) => {
        let base = x;
        if (integer !== null) {
            base = getFloat(integer, x, a);
        }
        let cub = calculateCub(base, a, b, c, d);
        if (integer !== null) {
            if (a >= 0) {
                if (cub <= 0) {
                    return true;
                }
            } else {
                if (cub >= 0) {
                    return true;
                }
            }

        } else {
            if (cub >= 0) {
                return true;
            }
        }

        return false;
    }

    let lBinarySearch = (L, a, b, c, d, check, integer) => {
        let l = L;
        let r = LIMIT;

        while (l < r) {
            if (a > 0) {
                m = Math.floor((l + r) / 2);
                if (check(m, a, b, c, d, integer)) {
                    r = m;
                } else {
                    l = m + 1;
                }
            } else {
                m = Math.floor((l + r + 1) / 2);
                if (check(m, a, b, c, d, integer)) {
                    l = m;
                } else {
                    r = m - 1;
                }
            }

        }
        return l;
    }

    let integer = lBinarySearch(-LIMIT, a, b, c, d, checkCub);
    let cub = calculateCub(integer, a, b, c, d);

    let decimal = 0;
    if (cub > 0) {
        decimal = lBinarySearch(0, a, b, c, d, checkCub, integer);
    }

    return getFloat(integer, decimal, a);
}

let fs = require('fs');
const fileContent = fs.readFileSync('cubroot.in');
const data = fileContent.toString().split('\n');
const result = getResult(data);
fs.writeFileSync('cubroot.out', result.toString());