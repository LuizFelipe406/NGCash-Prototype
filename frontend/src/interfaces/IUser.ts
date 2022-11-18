export default interface IUser {
  id?: number;
  username: string;
  accountId: number;
  account: {
    id: number;
    balance: number;
  }
}