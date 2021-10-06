/*

G. Банковские счета

*/

let getResult = data => {
	data = data.trim().split("\n")
	let str_result = ''
	let bank = new Map()
	let client_name = ''
	let val = ''
	for (let i = 0; i < data.length; i++) {
		let operation = data[i].trim().split(' ')
		switch (operation[0]) {
			case 'BALANCE':
				client_name = operation[1]
				if (bank.get(client_name) == undefined) {
					str_result += "ERROR\n"
				} else {
					str_result += bank.get(client_name) + "\n"
				}
				break
			case 'DEPOSIT':
				client_name = operation[1]
				let old_sum = bank.get(client_name)
				if (old_sum == undefined) {
					bank.set(client_name, parseInt(operation[2]))
				} else {
					bank.set(client_name, parseInt(old_sum) + parseInt(operation[2]))
				}
				break
			case 'INCOME':
				let procent = parseInt(operation[1])
				bank.forEach((value, key) => {
					if (value > 0) {
						bank.set(key, value + Math.trunc(value * procent / 100))
					}
				});
				break
			case 'TRANSFER':
				let from = operation[1]
				let to = operation[2]
				val = parseInt(operation[3])
				if (bank.get(from) == undefined) {
					bank.set(from, 0)
				}
				if (bank.get(to) == undefined) {
					bank.set(to, 0)
				}
				bank.set(from, bank.get(from) - val)
				bank.set(to, bank.get(to) + val)
				break
			case 'WITHDRAW':
				client_name = operation[1]
				val = parseInt(operation[2])
				if (bank.get(client_name) == undefined) {
					bank.set(client_name, 0)
				}
				bank.set(client_name, bank.get(client_name) - val)
				break
			default:
				break
		}
	}


	return str_result.trim()
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString()

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())