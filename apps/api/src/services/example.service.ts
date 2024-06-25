// services/example.service.ts
import { Context, Service } from 'moleculer';
import { MoleculerServiceSchema } from '../shared/types/moleculer.type';

const exampleService: MoleculerServiceSchema = {
  name: 'example',

  actions: {
    hello: (ctx: Context<{ name: string }>) => {
      return `Hello ${ctx.params.name}!`;
    },
    getEntity(ctx: Context<{ id: string }>) {
      return `This is user's ${ctx.params.id}`;
    },
  },

  events: {
    'user.created'(ctx: Context<{}>) {
      this.logger.info('User created event received:', ctx.params);
    },
  },
};

export = exampleService;
