/* D. Наполненность котятами */

let getResult = (data) => {

    let parse_ints = str => {
        return str.split(' ').filter(val => val != '').map(val => parseInt(val.trim()));
    }
    let [n, m] = parse_ints(data[0]);
    let cats = parse_ints(data[1]);
    cats.sort((a, b) => a - b);

    let events = [];
    cats.forEach(cat => {
        events.push([cat, 0]);
    })

    let otrezki = [];
    for (let i = 2; i < m + 2; i++) {
        let [begin, end] = parse_ints(data[i]);
        events.push([begin, -1, i - 2]);
        events.push([end, 1, i - 2]);
        otrezki.push([begin, end, 0]);
    }

    events.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    let cats_counter = 0
    for (e of events) {
        if (e[1] === -1) {
            otrezki[e[2]][2] = cats_counter;
        } else if (e[1] === 1) {
            otrezki[e[2]][2] = cats_counter - otrezki[e[2]][2];
        } else if (e[1] === 0) {
            cats_counter++;
        }

    }

    return otrezki.map(val => val[2]).join(' ');
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().trim().split("\n");
const result = getResult(data);
fs.writeFileSync("output.txt", result.toString());

