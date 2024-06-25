
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;
    const user = await this.userService.createUser(name, email);
    res.json(user);
  }
}
