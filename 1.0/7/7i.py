# I. Автобусы

reader = open('input.txt', 'r')

def get_time_in_minutes(str):
	hours, minutes = str.split(':')
	return int(hours) * 60 + int(minutes)

def getResult():

	N, M = reader.readline().strip().split(' ')
	N = int(N)
	M = int(M)

	IN = 1
	OUT = -1

	result = -1
	events = []

	city_state = []
	city_state = [0 for i in range(N+1)] 
	routes = []
	routes = [0 for i in range(M+1)] 

	for i in range(1, M+1):
		
		city1, time1, city2, time2 = reader.readline().strip().split(' ')
		city1 = int(city1)
		city2 = int(city2)

		time1 = get_time_in_minutes(time1)
		time2 = get_time_in_minutes(time2)

		events.append([time1, OUT, city1, time2, i])
		events.append([time2, IN, city2, time1, i])
		city_state[city1]-=1
		city_state[city2]+=1

	for i in range (1, N+1):
		if (city_state[i]<0):
			return result		

	events = sorted(events, key = lambda y: (y[0], -y[1]))

	result = 0	

	bus_state = []
	bus_state = [0 for i in range(N+1)] 

	for event in events:	
		time, arrive, bus_num, time_start, route_index = event;		
		if (arrive==OUT):
			if (bus_state[bus_num]==0):
				result+=1
			else:
				bus_state[bus_num]-=1
			
			routes[route_index] = 1;								
		else:	
			if (routes[route_index]!=0):
				if (time_start<time):
					bus_state[bus_num]+=1				

	for event in events:	
		time, arrive, bus_num, time_start, route_index = event;		
		if (arrive==OUT):
			if bus_state[bus_num]==0:
				result+=1
				routes[route_index] = 1
			else:
				bus_state[bus_num]-=1			
		else:	
			if (routes[route_index]!=0):				
				bus_state[bus_num]+=1												
	return result
				
result = getResult()

writer = open('output.txt', 'w')
writer.write("%d" % result)
writer.close()