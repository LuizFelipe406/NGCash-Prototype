import { NextFunction, Request, Response } from "express";
import TransactionService from "../services/TransactionService";

export default class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async transfer(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, body: { username, value } } = req;
      await this.transactionService.transfer(userId, username, value);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      const transactions = await this.transactionService.getTransactions(userId);
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }
}