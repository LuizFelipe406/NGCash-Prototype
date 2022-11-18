import UserRouter from "./UserRouter";
import LoginRouter from "./LoginRouter";
import TransactionRouter from "./TransactionRouter";

const userRouter = new UserRouter();
const loginRouter = new LoginRouter();
const transactionRouter = new TransactionRouter();

export { userRouter, loginRouter, transactionRouter };
