import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const createdUser = await this.userService.create(username, password);
      res.status(201).json({ id: createdUser.id });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
