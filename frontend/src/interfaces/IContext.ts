import ITransaction from "./ITransaction";
import IUser from "./IUser";

export default interface IContext {
  user: IUser,
  getToken(): void,
  token: string,
  changeBalance(value: number): void,
  transactions: ITransaction[],
  addTransaction(value: ITransaction): void,
  updateTransactions(value: ITransaction[]): void
}