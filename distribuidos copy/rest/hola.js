async function myFunction() {
  try {
    // conecta a Redis usando await
    await client.connect();
    console.log('Conexión exitosa a Redis');
    
  } catch (err) {
    console.log('Error al conectarse a Redis: ' + err);
  }
}

myFunction();