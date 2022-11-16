import Account from "../database/models/Account";
import User from "../database/models/User";
import sequelize from "../database/models";
import Transaction from "../database/models/Transaction";

export default class UserModel {
  async create(username: string, password: string): Promise<User> {
    try {
      const result = await sequelize.transaction(async (t) => {
        const newAccount = await Account.create(
          { balance: 100 },
          { transaction: t }
        );

        const newUser = await User.create(
          { username, password, accountId: newAccount.id },
          { transaction: t }
        );
        return newUser;
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await User.findOne({ where: { username } });
    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await User.findOne({
      where: { id },
      include: [
        { model: Account, as: 'account'},
        { model: Transaction, as: 'debitedAccount' },
        { model: Transaction, as: 'creditedAccount' }
      ]
    });

    return user;
  }
}
