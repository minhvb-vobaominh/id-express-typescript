
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';

export class DependencyInjector {
  static getUserController(): UserController {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    return new UserController(userService);
  }
}
