import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './config';
import { DependencyInjector } from './utils/dependencyInjector';
import { ServiceBroker } from 'moleculer';

const app: Application = express();
const port: number = 4444;

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
  name: 'history',
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
  .then(() => broker.call('math.add', { a: 5, b: 3 }))
  .then((res) => console.log('5 + 3 =', res))
  .catch((err) => console.error(`Error occurred! ${err.message}`));

app.use(express.json());

const userController = DependencyInjector.getUserController();

app.get('/users', (req: Request, res: Response) =>
  userController.getUsers(req, res)
);
app.post('/users', (req: Request, res: Response) =>
  userController.createUser(req, res)
);
// app.listen(port, () => {
//   console.log(`Api app is running on port ${port}`);
// });

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
