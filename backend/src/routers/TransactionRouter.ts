import express from "express";
import TransactionController from "../controllers/TransactionController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

export default class UserRouter {
  public router: express.IRouter;
  private transactionController: TransactionController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = express.Router();
    this.transactionController = new TransactionController();
    this.authMiddleware = new AuthMiddleware();

    this.configRoutes();
  }

  private configRoutes() {
    this.router.use(this.authMiddleware.validateToken);

    this.router.post("/", (req, res, next) =>
      this.transactionController.transfer(req, res, next)
    );

    this.router.get("/", (req, res, next) =>
      this.transactionController.getTransactions(req, res, next)
    );

    this.router.get("/filtered", (req, res, next) =>
      this.transactionController.getTransactionsByFilter(req, res, next)
    );
  }
}
