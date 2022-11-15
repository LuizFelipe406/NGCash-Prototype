import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import { userRouter } from './routers';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/user', userRouter.router);

    this.app.use(ErrorMiddleware.handle)
  }

  private config():void {
    this.app.use(express.json());
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000'
    }))
  }

  public start(PORT: string): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();