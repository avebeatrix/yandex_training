# J. НГУ-стройка

reader = open('input.txt', 'r')

def getResult():

	TOP = 0
	BOTTOM = 1

	N, W, L = map(lambda s: int(s) if s.isdigit() else s, reader.readline().strip().split(' '))

	S = W * L	
	
	events = []
	blocks = [0]	

	for i in range(1, N+1):
		
		x1, y1, z1, x2, y2, z2 = map(lambda s: int(s) if s.isdigit() else s, reader.readline().strip().split(' '))
		blocks.append({'z1':z1, 'z2':z2})
		s = (x2 - x1) * (y2 - y1)
		events.append([z1, BOTTOM, s])
		events.append([z2, TOP, s])

	events.sort() 

	block_count = 0
	min_block_count = N + 1
	min_z = 0
	curS = S

	for event in events:	
		z, type, area = event

		if (type == TOP):
			block_count-=1
			curS += area

		else:
			block_count+=1
			curS -= area
			if (curS == 0):
				if (block_count < min_block_count):
					min_z = z
					min_block_count = block_count												

	if (min_block_count > N):
		return 'NO'
	else:
		result = 'YES\n' + str(min_block_count) + '\n'
		for i in range(1, N+1):			
			if (blocks[i].get('z1') <= min_z and blocks[i].get('z2') > min_z) :
				result += str(i) + ' '			
		return result.strip();	
				
result = getResult()

writer = open('output.txt', 'w')
writer.write(result)
writer.close()