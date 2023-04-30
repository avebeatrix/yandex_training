/* A. Закраска прямой */

let getResult = (data) => {

    let parse_ints = str => {
        return str.split(' ').filter(val => val != '').map(val => parseInt(val.trim()));
    }
    let N = parseInt(data[0]);
    let events = [];
    for (let i = 1; i <= N; i++) {
        let [begin, end] = parse_ints(data[i]);
        events.push([begin, -1]);
        events.push([end, 1]);
    }
    events.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    let result = 0;
    let current_counter = 0;
    let current_left_position = events[0][0];
    events.forEach(event => {
        if (event[1] === -1) {
            if (current_counter === 0) {
                current_left_position = event[0];
            }
            current_counter++;
        } else {
            current_counter--;
        }
        if (current_counter === 0) {
            result += event[0] - current_left_position;            
        }
    })

    return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().trim().split("\n");
const result = getResult(data);
fs.writeFileSync("output.txt", result.toString());

