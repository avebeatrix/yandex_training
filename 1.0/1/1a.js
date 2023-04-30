/* A. Кондиционер */
let getTemperature = (now, want, mode) => {

    switch (mode) {
        case 'freeze':
            if (want < now) {
                return want;
            } else {
                return now;
            }
            break;
        case 'heat':
            if (want > now) {
                return want;
            } else {
                return now;
            }
            break;
        case 'auto':
            return want;
            break;
        case 'fan':
            return now;
            break;
    }
}


const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8");

const strings = fileContent.toString().split("\n");
const [now, want] = strings[0].split(' ');
const mode = strings[1];
const result = getTemperature(parseInt(now), parseInt(want), mode);


fs.writeFileSync("output.txt", result.toString());