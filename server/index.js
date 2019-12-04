const express = require('express')
const app = express()
const port = 3000

function getRandomDelay(min, max) {
  return min + Math.random() * (max - min);
}

function latency(options = {}) {
  const min = options.min || 0;
  const max = Math.max(options.max || 0, min);

  return function (req, res, next) {
    const wait = getRandomDelay(min, max);
    setTimeout(next, wait);
  };
}

const lag = latency({ min: 0, max: 100 })

// app.use(lag);


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/json/:name', lag, (req, res, next) => {
  const data = new Array(parseInt(req.query.size, 10) || 1).fill(1)

  let ms = req.query.t;
  ms = (ms > 5000 || isNaN(ms)) ? 0 : parseInt(ms);

  console.log(ms)

  // setTimeout((() => res.status(200).send({ delay: ms, data })), ms);
  res.status(200).send({ delay: ms, data })

})



app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
