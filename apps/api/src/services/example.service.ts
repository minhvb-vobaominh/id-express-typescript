import { Context } from 'moleculer';
import { Logger } from '@demo-3/shared';
// import { MoleculerServiceSchema } from '../shared/types/moleculer.type';

const exampleService = {
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
      Logger.info('User created event received:', ctx.params);
    },
  },
};

export = exampleService;
