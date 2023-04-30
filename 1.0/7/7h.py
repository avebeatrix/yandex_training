#H. Охрана

reader = open('input.txt', 'r')

K = int(reader.readline().strip())
result = []

def bool_to_str(c):
	result = 'Wrong Answer'
	if c:
		result = 'Accepted'
	return result

for i in range(1, K+1):
	str_arr = reader.readline().strip().split(' ')
	N = int(str_arr[0])
	events = []

	for j in range(1, N*2+1, 2):
		start = int(str_arr[j])
		end = int(str_arr[j + 1])
		index = (j - 1) / 2
		events.append((start, -1, index))
		events.append((end, 1, index))

	events.sort()

	good = set()
	current = set()

	if events[0][0] != 0 or events[len(events) - 1][0] < 10000:
		result.append(False)
	else:
		goodFlag = True
		prevtime = -1
		for event in events:
			if event[0] != 0 and len(current) == 0:
				goodFlag = False
				break
			
			if len(current) == 1 and event[0] != prevtime:
				for val in current:				
					good.add(val)			
			
			if event[1] == -1:
				current.add(event[2])
			else:
				current.remove(event[2])
			
			prevtime = event[0]
		
		if events[len(events)-1][0] != 10000:
			goodFlag = False
		

		if goodFlag and len(good) == N:
			result.append(True)
		else:
			result.append(False);	
				
result = '\n'.join(map(bool_to_str, result))

writer = open('output.txt', 'w')
writer.write(result)
writer.close()