import requests
import time
import random

archivo = open('/Users/Ultraxion/Desktop/peliculas.json', 'r')

lista2 = []
lista3 = []
for linea in archivo:
    lista = linea.split(",")
    lista2.append(lista[1].split(":"))
    

for i in lista2:
    lista3.append(i[1])


i = 14000
initial_max_calls = 1000  # Cantidad máxima de llamadas que intentará hacer el script en un primer momento
min_calls = 1  # Cantidad mínima de llamadas permitidas
delay_seconds = 1  # Cantidad de tiempo que esperará el script antes de volver a llamar a la API en caso de error
error_rate_threshold = 0.2  # Umbral de tasa de errores a partir del cual se reducirá la cantidad de llamadas permitidas
calls = 0  # Contador de llamadas realizadas
errors = 0  # Contador de errores de la API

while calls < initial_max_calls:

    try:
        response = requests.get('http://localhost:3000/search/'+str(lista3[i]))
        response.raise_for_status()  # Lanza una excepción si la respuesta no es exitosa
        # Hacer algo con la respuesta
        i += 1
        calls += 1  # Aumentar el contador de llamadas realizadas
        errors = 0  # Restablecer el contador de errores de la API en caso de éxito
    except requests.exceptions.RequestException as e:
        print(f"Error al llamar a la API: {e}")
        errors += 1  # Aumentar el contador de errores de la API en caso de error
        if errors / calls > error_rate_threshold:
            # Si la tasa de errores supera el umbral, reducir la cantidad de llamadas permitidas
            initial_max_calls = max(calls - 1, min_calls)
        time.sleep(delay_seconds)  # Esperar antes de volver a intentar llamar a la API
    else:
        delay_seconds = 1  # Restablecer el tiempo de espera en caso de éxito

print(f"Se hicieron {calls} llamadas exitosas a la API.")
