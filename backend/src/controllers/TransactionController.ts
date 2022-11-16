import { NextFunction, Request, Response } from "express";
import TransactionService from "../services/TransactionService";

export default class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async transfer(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        userId,
        body: { username, value },
      } = req;
      const newTransfer = await this.transactionService.transfer(userId, username, value);
      res.status(200).json(newTransfer);
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      const transactions = await this.transactionService.getTransactions(
        userId
      );
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  async getTransactionsByFilter(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        userId,
        body: { type, month, year },
      } = req;
      const transactions =
        await this.transactionService.getTransactionsByFilter(
          userId,
          type,
          month,
          year
        );
      return transactions;
    } catch (error) {
      next(error);
    }
  }
}
