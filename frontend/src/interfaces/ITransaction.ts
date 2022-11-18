export default interface ITransaction {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: Date;
  creditedUsername: string;
  debitedUsername: string;
}