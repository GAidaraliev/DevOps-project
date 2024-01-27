const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')
const promClient = require('prom-client')


const app = express()
const port = process.env.PORT || 3000

const db = require('./dbClient')
db.on("error", (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Create a Registry which registers the metrics
const register = new promClient.Registry()
promClient.collectDefaultMetrics({ register });
	
const Histogram = promClient.Histogram;
const requestDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'request duration histogram',
    labelNames: ['handler' , 'method', 'statuscode'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});
 
// Register the histogram
register.registerMetric(requestDuration)
 
const profilerMiddleware = (req, res, next) => {
    const end = requestDuration.startTimer()
    res.once('finish', () => {
      const duration = end({ handler:req.url, method: req.method, statuscode: res.statusCode });
    });
 
  next();
};
app.use(profilerMiddleware);

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/user', userRouter)

// Setup server to Prometheus scrapes:
app.get('/metrics', async (req, res) => {
  try {
      res.set('Content-Type', promClient.register.contentType);
      res.end(await promClient.register.metrics());
  } catch (ex) {
      res.status(500).end(ex);
  }
});


const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})


module.exports = server
