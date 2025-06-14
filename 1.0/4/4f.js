/* F. Продажи */

const getOrders = (data) => {
  data.sort();
  let str_result = "";
  let current_customer = false;
  let current_item = false;
  let counter = 0;
  for (let i = 0; i < data.length; i++) {
    let [customer, item, count] = data[i].trim().split(" ");
    if (customer != current_customer) {
      if (current_customer != false) {
        str_result += counter + "\n";
        counter = 0;
        current_item = false;
      }
      str_result += customer + ":\n";
      current_customer = customer;
    }
    if (item != current_item) {
      if (current_item != false) {
        str_result += counter + "\n";
      }
      str_result += item + " ";
      current_item = item;
      counter = parseInt(count);
    } else {
      counter += parseInt(count);
    }
  }
  if (counter > 0) {
    str_result += counter + "\n";
  }

  return str_result.trim();
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
  const result = getOrders(data);
  console.log(result.toString());
  rl.close();
});
