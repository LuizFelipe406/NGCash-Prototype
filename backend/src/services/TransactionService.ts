import User from "../database/models/User";
import AccountModel from "../models/AccountModel";
import TransactionModel from "../models/TransactionModel";
import UserModel from "../models/UserModel";
import CustomError, { CustomErrorParams } from "../utils/CustomError";

export default class TransactionService {
  private transactionModel: TransactionModel;
  private accountModel: AccountModel;
  private userModel: UserModel;

  constructor() {
    this.transactionModel = new TransactionModel();
    this.accountModel = new AccountModel();
    this.userModel = new UserModel();
  }

  async transfer(userId: number, creditedUsername: string, value: number) {
    const creditedUser = await this.userModel.getUserByUsername(creditedUsername);
    const debitedUser = await this.userModel.getUserById(userId);
    if (!creditedUser || !debitedUser) throw new Error();

    const error = await this.validations(creditedUser, debitedUser, value);
    if (error) throw new CustomError(error.message, error.status);

    await this.transactionModel.transfer(
      debitedUser.accountId,
      creditedUser.accountId,
      value
    );
  }

  private async validations(
    creditedUser: User,
    debitedUser: User,
    value: number
  ): Promise<CustomErrorParams | null> {
    if (creditedUser.id === debitedUser.id)
      return { status: 400, message: "invalid transfer" };

    const error = await this.validateBalance(debitedUser.accountId, value);
    return error;
  }

  private async validateBalance(
    debitedAccountId: number,
    value: number
  ): Promise<CustomErrorParams | null> {
    const account = await this.accountModel.getAccountById(debitedAccountId);
    if (!account) throw new Error();

    if (account.balance < value) return { status: 401, message: "invalid funds" };
    return null;
  }
}
