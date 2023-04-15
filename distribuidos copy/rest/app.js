// dependencias y definiciones

const express = require("express");
const rd1 = require("./redis1");
const rd2 = require("./redis2");
const rd3 = require("./redis3");
const axios = require('axios');


const port = 3000;
const app = express();

app.use(express.json());

function hashFunction(key) {
  const hash = key.toString().split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % 3;
}

function getRedisClient(key) {
  const shardKey = hashFunction(key);
  if (shardKey === 0) {
      return rd1;
  } else if (shardKey === 1) {
      return rd2;
  } else {
      return rd3;
  }
}
// ruta de busqueda
app.get("/search/:item", async (req, res) => {
    const { item } = req.params;
    const rd = getRedisClient(item);
    if (item) {
      rd.get(item, function (err, reply) {
        if (reply) {
          console.log("uso cache");
          res.json(JSON.parse(reply));
        } else {
          console.log("lo busco y agrego");
          axios.get('https://api.themoviedb.org/3/movie/'+item+'?api_key=8ccfec7c9a7e42a3b6d5631729298e8e')
          .then((response) => {
            rd.set(item, JSON.stringify(response.data), (err, reply) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log(reply); // Debería imprimir "OK"
                }
            });
            res.json(response.data);
            })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error');
          });
        }
      });
    }
  });

// api

app.listen(port, () => {
  console.log(`API RUN AT http://localhost:${port}`);
});