def read_in_data(string):
	print('hi')





if __name__ == '__main__':
	data = {}
	i = 0
	for line in open('positions.csv').read().split("\n"):
		print("i = ", i)
		m = line.strip().split(",")
		if('\ufeff' in m[0]):
			print("FUCK")
		print("m[0] = ", m[0])
		if m[0] in data.keys():
			print("already in")
			# data[m[0]].append([m[1],m[2],m[3]])
		else:
			data[m[0]] = [(m[1],m[2],m[3])]
		i+=1
		if i == 10:
			break
		print(data.keys())