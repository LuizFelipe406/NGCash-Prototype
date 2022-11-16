import express from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

export default class UserRouter {
  public router: express.IRouter;
  private userController: UserController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.authMiddleware = new AuthMiddleware();

    this.configRoutes();
  }

  private configRoutes() {
    this.router.post('/', (req, res, next) => this.userController.create(req, res, next));

    this.router.get('/',
      this.authMiddleware.validateToken,
      (req, res, next) => this.userController.getUser(req, res, next),
    );
  }
}