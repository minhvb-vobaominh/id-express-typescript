import { DataSource } from 'typeorm';
import { User } from '../entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '103.77.215.101',
  port: 5432,
  username: 'admin',
  password: 'ascend@123.',
  database: 'db_demo',
  entities: [User],
  synchronize: true,
});
