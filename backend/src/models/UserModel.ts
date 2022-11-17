import Account from "../database/models/Account";
import User from "../database/models/User";
import sequelize from "../database/models";

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
        { model: Account, as: 'account'}
      ],
      attributes: { exclude: ['password'] }
    });

    return user;
  }

  async getUsernameByAccountId(id: number): Promise<string | undefined> {
    const user = await User.findOne({
      where: { accountId: id }
    });
    if (user) {
      return user.username;
    }
    return undefined
  }
}
