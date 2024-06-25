
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(name: string, email: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    return this.userRepository.save(user);
  }
}
