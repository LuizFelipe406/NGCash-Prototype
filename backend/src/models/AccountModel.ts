import Account from "../database/models/Account";

export default class AccountService {
  async getAccountById(id: number): Promise<Account | null> {
    const account = await Account.findOne({ where: { id }});
    return account
  }
}