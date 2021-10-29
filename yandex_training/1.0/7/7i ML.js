/* I. Автобусы */

let getResult = data => {

	let parse_line = (line, is_int = false) => {
		let result = line.trim().split(' ').filter(val => val != '');
		if (is_int) {
			return result.map(input => parseInt(input));
		}
		return result;
	}
	let get_time_in_minutes = (str) => {
		let [hours, minutes] = str.split(':');
		return parseInt(hours) * 60 + parseInt(minutes);
	}

	let [N, M] = parse_line(data[0], true);
	const IN = 1;
	const OUT = -1;

	let result = -1;
	let events = [];
	let city_state = new Array(N + 1).fill(0);	
	let routes = new Array(N + 1).fill(0);
	for (let x = 1; x <= M; x++) {
		let [city1, time1, city2, time2] = parse_line(data[x]);
		time1 = get_time_in_minutes(time1);
		time2 = get_time_in_minutes(time2);
		events.push([time1, OUT, city1, time2, x]);
		events.push([time2, IN, city2, time1, x]);
		city_state[city1]--;
		city_state[city2]++;
	}
	for (let i = 1; i <= N; i++) {
		if (city_state[i]<0){
			return result;
		}
	}
	events.sort((a,b)=>{
		if (a[0]===b[0]){
			return b[1]-a[1];
		}
		return a[0]-b[0];
	})
	result = 0;
	let bus_state = new Array(N+1).fill(0);
	for(let event of events){		
		let [time, arrive, bus_num, time_start, route_index] = event;		
		if (arrive===OUT){			
			if (bus_state[bus_num]===0){
				result++;				
			}else{
				bus_state[bus_num]--;
			}	
			routes[route_index] = 1;								
		}else{	
			if (routes[route_index]!==0){	
				if (time_start<time){
					bus_state[bus_num]++;	
				}																
			}											
		}		
	}
	for(let event of events){		
		let [time, arrive, bus_num, time_start, route_index] = event;		
		if (arrive===OUT){			
			if (bus_state[bus_num]===0){
				result++;
				routes[route_index] = 1;
			}else{
				bus_state[bus_num]--;
			}									
		}else{	
			if (routes[route_index]!==0){			
				bus_state[bus_num]++;										
			}											
		}		
	}
	
	return result;
}

const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8")

const data = fileContent.toString().trim().split("\n")

const result = getResult(data)

fs.writeFileSync("output.txt", result.toString())

const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

const memoryData = process.memoryUsage()

const memoryUsage = {
                rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
                heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
                heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
                external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
}

console.log(memoryUsage)