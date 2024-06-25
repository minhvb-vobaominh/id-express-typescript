import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './config';

import { ServiceBroker } from 'moleculer';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { UserRepository } from './repositories/UserRepository';
import { Logger } from '@demo-3/shared';

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
  name: 'api',
  actions: {
    hello(ctx) {
      return 'Hello from api service';
    },
  },
});

// Start broker
broker.start().catch((err) => console.error(`Error occurred! ${err.message}`));

app.use(express.json());

const userController = new UserController(
  new UserService(new UserRepository())
);

app.get('/users', (req: Request, res: Response) =>
  userController.getUsers(req, res)
);
app.post('/users', (req: Request, res: Response) =>
  userController.createUser(req, res)
);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      Logger.debug(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
