/*

F. Продажи

*/

let getOrders = data => {
	data = data.trim().split("\n")
	data.sort()
	let str_result = ''
	let current_customer = false;
	let current_item = false;	
	let counter = 0;
	for (let i = 0; i < data.length; i++) {
		let [customer, item, count] = data[i].trim().split(' ')
		if (customer != current_customer) {
			if (current_customer != false) {
				str_result += counter + "\n"
				counter = 0
				current_item = false
			}
			str_result += customer + ":\n"
			current_customer = customer
		}
		if (item != current_item) {
			if (current_item != false) {
				str_result += counter + "\n"
			}
			str_result += item + ' '
			current_item = item
			counter = parseInt(count)
		} else {
			counter += parseInt(count)
		}
	}
	if (counter > 0) {
		str_result += counter + "\n"
	}


	return str_result.trim()
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString()

const result = getOrders(data)

fs.writeFileSync("output.txt", result.toString())