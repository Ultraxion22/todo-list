import requests
import time

archivo = open('/Users/Ultraxion/Desktop/peliculas.json', 'r')

lista2 = []
lista3 = []
for linea in archivo:
    lista = linea.split(",")
    lista2.append(lista[1].split(":"))
    

for i in lista2:
    lista3.append(i[1])

start_total = time.time()
each_time = 0

for j in range(11001, 12001):
    start_each = time.time()
    url = 'http://localhost:3000/search/'+str(lista3[j])
    response = requests.get(url)
    data = response.json()
    end_each = time.time()
    each_time += end_each - start_each #suma de cada consulta para luego calculo del promedio

end_total = time.time()

print("tiempo promedio consulta en milisegundos: "+ str((each_time/1000)*1000))
print("tiempo total en segundos: "+str(round((end_total-start_total),1)))
    



    




