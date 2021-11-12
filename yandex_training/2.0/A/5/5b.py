# B. Сложите конфетки

reader = open('input.txt', 'r')

def getResult():
	k = int(reader.readline().strip())
	sweeties = []
	result = ''
	for i in range(1, k+1):
		str_arr = reader.readline().strip().split(' ')
		a = int(str_arr[0])
		n = int(str_arr[1])
		if k==1 and n==1:
			return str(k)+'\n'+str(a)
		sweeties.append([a, n])
	
	left_pointer = 0
	right_pointer = k-1

	A = sweeties[left_pointer][0]
	sweeties[left_pointer][1]-=1
	B = 0
	if (sweeties[left_pointer][1]>0):
		B = A;	
		sweeties[left_pointer][1]-=1;	
	else:
		if (left_pointer<right_pointer):
			left_pointer+=1
			B = sweeties[left_pointer][0]
			sweeties[left_pointer][1]-=1
		else:
			B = A
			A = 0						
	
	if (sweeties[left_pointer][1]==0 and left_pointer<right_pointer):
		left_pointer+=1	

	D = sweeties[right_pointer][0]
	sweeties[right_pointer][1]-=1
	C = 0
	if (sweeties[right_pointer][1]>0):
		C = D;	
		sweeties[right_pointer][1]-=1	
	else:
		if (left_pointer<right_pointer):
			right_pointer-=1
			C = sweeties[right_pointer][0];	
			sweeties[right_pointer][1]-=1
		else:
			C = D
			D = 0					
	
	if (sweeties[right_pointer][1]==0 and left_pointer<right_pointer):
		right_pointer-=1	
	
	while (True) :
		if (A!=0 and B!=0 and C!=0 and D!=0):		
			count = min(A, D)
			A -= count
			B += count
			C += count
			D -= count

			if (A==0):
				if (sweeties[left_pointer][1]>0):
					sweeties[left_pointer][1]-=1
					A = B
					B = sweeties[left_pointer][0]
					if (sweeties[left_pointer][1]==0 and left_pointer<right_pointer):
						left_pointer+=1					
				else:
					if (left_pointer<right_pointer):
						left_pointer+=1
						sweeties[left_pointer][1]-=1
						A = B
						B = sweeties[left_pointer][0]
						if (sweeties[left_pointer][1]==0 and left_pointer<right_pointer):
							left_pointer+=1
																
			if (D==0):
				if (sweeties[right_pointer][1]>0):
					sweeties[right_pointer][1]-=1
					D = C
					C = sweeties[right_pointer][0]
					if (sweeties[right_pointer][1]==0 and left_pointer<right_pointer):
						right_pointer-=1					
				else:
					if (left_pointer<right_pointer):
						right_pointer-=1
						sweeties[right_pointer][1]-=1
						D = C
						C = sweeties[right_pointer][0]
						if (sweeties[right_pointer][1]==0 and left_pointer<right_pointer):
							right_pointer-=1																					

		elif (A==0 and D==0):
			return '2\n'+str(B)+' '+str(C)
		elif(A==0):
			count = min(B, D)
			B -= count
			C += count*2
			D -= count		

			if (B==0 and D==0):
				return '1\n'+str(C)
			elif (B==0):
				return '2\n'+str(C)+' '+str(D)
			else:
				return '2\n'+str(B)+' '+str(C)
			
		elif(D==0):
			count = min(A, C)
			A -= count
			B += count*2
			C -= count		

			if (A==0 and C ==0):
				return '1\n'+str(B)
			elif (A==0):
				return '2\n'+str(B)+' '+str(C)
			else:
				return '2\n'+str(A)+' '+str(B)
			
		elif (B==0):
			return '1\n'+str(C)
		elif (C==0):
			return '1\n'+str(B)								


result = getResult()

writer = open('output.txt', 'w')
writer.write(result)
writer.close()