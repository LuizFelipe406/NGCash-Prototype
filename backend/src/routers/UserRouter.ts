import express from 'express';
import UserController from '../controllers/UserController';

export default class UserRouter {
  public router: express.IRouter;
  private userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();

    this.configRoutes();
  }

  private configRoutes() {
    this.router.post('/', (req, res, next) => this.userController.create(req, res, next));
  }
}