import UserRouter from './UserRouter';
import LoginRouter from './LoginRouter';

const userRouter = new UserRouter();
const loginRouter = new LoginRouter();

export { userRouter, loginRouter };