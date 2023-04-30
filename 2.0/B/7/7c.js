/* C. Минимальное покрытие */

let getResult = (data) => {

    const NO_SOLUTION = 'No solution';
    let parse_ints = str => {
        return str.split(' ').filter(val => val != '').map(val => parseInt(val.trim()));
    }
    let M = parseInt(data[0]);

    let events = [];
    let i = 0;
    while (true) {
        i++;
        let [begin, end] = parse_ints(data[i]);
        if (begin === 0 && end === 0) break;
        if (end < 0 || begin > M ) continue;
        if (begin <= 0 && end >= M) {
            return `1\n${begin} ${end}`;
        }
        events.push([begin, end]);
    }

    events.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });

    if (events.length === 0 || events[0][0] > 0) {
        return NO_SOLUTION;
    }

    let result = [];
    let nowright = 0;
    let nowbest = [0, 0];
    let nextright = 0;

    for (e of events) {
        if (e[0] > nowright) {
            result.push(nowbest);
            nowright = nextright;
            if (nowright >= M) {
                break;
            }
        }
        if (e[0] <= nowright && e[1] > nextright){           
            nowbest = e;
            nextright = e[1];
        }
    }

    if (nowright < M){
        nowright = nextright;
        result.push(nowbest);        
    }
    if (nowright < M){
        return NO_SOLUTION;
    }

    return result.length + '\n' + result.map(val => val.join(' ')).join('\n');
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().trim().split("\n");
const result = getResult(data);
fs.writeFileSync("output.txt", result.toString());

