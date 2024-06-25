
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../config';

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, AppDataSource.manager);
  }

  async findByName(name: string): Promise<User | null> {
    return this.findOne({ where: { name } });
  }
}
