/* C. Самое частое слово */

const getMostOftenWord = (data) => {
  const words = data
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter((input) => input != "");
  const dict_all = [];
  for (i = 0; i < words.length; i++) {
    if (dict_all[words[i]] === undefined) dict_all[words[i]] = 0;
    dict_all[words[i]]++;
  }
  let max = 0;
  let min_word = false;
  for (let item in dict_all) {
    if (dict_all[item] > max) {
      max = dict_all[item];
    }
  }
  for (let i = 0; i < words.length; i++) {
    if (dict_all[words[i]] == max) {
      if (min_word === false) {
        min_word = words[i];
      } else if (min_word > words[i]) {
        min_word = words[i];
      }
    }
  }
  if (min_word === false) return "";

  return min_word;
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data = [];
rl.on("line", (line) => {
  data.push(line.trim());
});

rl.on("close", () => {
  const result = getMostOftenWord(data);
  console.log(result.toString());
  rl.close();
});
