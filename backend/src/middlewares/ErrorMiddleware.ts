/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/CustomError';

export default class ErrorMiddleware {
  static handle(err: CustomError, req: Request, res: Response, _next: NextFunction) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    console.log('Error message:', err.message);
    console.log(err);
    return res.sendStatus(500);
  }
}