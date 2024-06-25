import express from 'express';
import * as path from 'path';
import { ServiceBroker } from 'moleculer';
import { logger } from '@demo-3/libs';

const app = express();

const broker = new ServiceBroker({
  transporter: {
    type: 'NATS',
    options: {
      url: 'nats://103.77.215.101:4222',
      user: 'ruser',
      pass: 'T0pS3cr3t',
    },
  },
});

// Create a service
broker.createService({
  name: 'math',
  actions: {
    add(ctx) {
      return Number(ctx.params.a) + Number(ctx.params.b);
    },
  },
});

// Start broker
broker
  .start()
  // Call service
  .then(() => broker.call('history.add', { a: 10, b: 10 }))
  .then((res) => console.log('in math', res))
  .catch((err) => console.error(`Error occurred! ${err.message}`));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/storage', (req, res) => {
  broker
    .call('api.hello')
    .then((result: any) => {
      console.log(result);
    })
    .catch((err: Error) => {
      console.log(err);
    });
  res.send({ message: 'Welcome to storage!' });
});

const port = 3333;
app.listen(port, () => {
  logger();
  console.log(`Listening at http://localhost:${port}/api`);
});
