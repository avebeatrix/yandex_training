/* H. Расшифровка письменности Майя */

const getResult = (data) => {
  const [word_length, all_length] = data[0]
    .split(" ")
    .map((input) => parseInt(input));
  const word = data[1].trim();
  const s = data[2].trim();
  const word_dict = new Map();
  const all_dict = new Map();
  const second_dict = new Map();
  [...word].forEach((element) => {
    word_dict.set(element, (word_dict.get(element) ?? 0) + 1);
  });
  let result = 0;
  for (let i = 0; i < all_length; i++) {
    all_dict.set(s[i], (all_dict.get(s[i]) ?? 0) + 1);

    if (i - word_length >= 0) {
      second_dict.set(
        s[i - word_length],
        (second_dict.get(s[i - word_length]) ?? 0) + 1
      );
    }
    let is_candidate = true;
    for (let [key, val] of word_dict) {
      let cf = second_dict.get(key);
      if (cf === undefined) cf = 0;
      let ca = all_dict.get(key);
      if (ca === undefined || ca - cf != val) {
        is_candidate = false;
        break;
      }
    }
    if (is_candidate) result++;
  }
  return result;
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
  const result = getResult(data);
  console.log(result.toString());
  rl.close();
});
