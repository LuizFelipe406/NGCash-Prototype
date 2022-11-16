import { NextFunction, Request, Response } from "express";
import JWT from '../auth/JWT';

export default class AuthMiddleware {
  validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const validation = JWT.validateToken(authorization as string);
    if (typeof validation === 'number') {
      req.userId = validation;
      next();
    } else {
      next(validation);
    }
  }
}