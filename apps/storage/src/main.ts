import express from 'express';
import * as path from 'path';
import { ServiceBroker } from 'moleculer';
import { Logger } from '@demo-3/shared';

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
  name: 'storage',
  actions: {
    hello(ctx) {
      return 'Hello from storage service';
    },
  },
});

// Start broker
broker.start().catch((err) => console.error(`Error occurred! ${err.message}`));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/storage', (req, res) => {
  broker
    .call('api.hello')
    .then((result: any) => {
      Logger.info(`In storage side received: ${result}`);
    })
    .catch((err: Error) => {
      Logger.error(err);
    });
  res.send({ message: 'Welcome to storage!' });
});

const port = 3333;
app.listen(port, () => {
  Logger.debug(`Listening at http://localhost:${port}/storage`);
});
