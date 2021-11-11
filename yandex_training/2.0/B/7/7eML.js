/* E. Полярные прямоугольники */

let getResult = (data) => {

    let parse_floats = str => {
        return str.split(' ').filter(val => val != '').map(val => parseFloat(val.trim()));
    }

    let N = parseInt(data[0]);
    let R1 = 0;
    let R2 = 10 ** 6;
    let events = [];
    for (let i = 1; i <= N; i++) {
        let [r1, r2, a1, a2] = parse_floats(data[i]);
        R2 = Math.min(R2, r2);
        R1 = Math.max(R1, r1);
        events.push([a1, -i]);
        events.push([a2, i]);
    }
    let radius = R2 ** 2 - R1 ** 2;
    events.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    let used = new Set();
    let counter = 0;
    let result = 0;
    for (let e of events) {
        if (e[1] < 0) {
            counter++;
            used.add(-e[1]);
        } else if (used.has(e[1])) {
            counter--;
        }
    }
    for (let i = 0; i < N * 2; i++) {
        let e = events[i];
        if (e[1] < 0) {
            counter++;
        } else {
            counter--;
        }
        if (counter === N) {
            if (i < events.length - 1) {
                result += (events[i + 1][0] - events[i][0]) * radius / 2;
            } else {
                result += (events[0][0] - events[events.length - 1][0] + 2 * Math.PI) * radius / 2;
            }

        }
    }

    return result;
}

const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().trim().split("\n");
const result = getResult(data);
fs.writeFileSync("output.txt", result.toString());

const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

const memoryData = process.memoryUsage()

const memoryUsage = {
    rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
    heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
    heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
    external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
}

console.log(memoryUsage)