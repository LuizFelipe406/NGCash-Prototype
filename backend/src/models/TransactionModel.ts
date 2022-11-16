import { Op } from "sequelize";
import sequelize from "../database/models";
import Account from "../database/models/Account";
import Transaction from "../database/models/Transaction";

type typeQueryFilter = {
  debitedAccountId?: number
  creditedAccountId?: number
}

export default class TransactionModel {
  async transfer(
    debitedAccountId: number,
    creditedAccountId: number,
    value: number
  ) {
    try {
      const result = await sequelize.transaction(async (t) => {
        await Account.increment(
          { balance: -value },
          { where: { id: debitedAccountId }, transaction: t }
        );

        await Account.increment(
          { balance: value },
          { where: { id: creditedAccountId }, transaction: t }
        );

        const transaction = await Transaction.create(
          {
            debitedAccountId,
            creditedAccountId,
            value,
            createdAt: new Date(Date.now()).toISOString(),
          },
          { transaction: t }
        );

        return transaction;
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTransactions(id: number): Promise<Transaction[] | null> {
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ debitedAccountId: id }, { creditedAccountId: id }],
      },
    });
    return transactions;
  }

  async getTransactionsByFilter(type: typeQueryFilter[], month: string, year: string) {
    const transactions = await Transaction.findAll({
      where: {
        [Op.and]: [
          { [Op.or]: type },
          { createdAt: sequelize.where(sequelize.fn("month", sequelize.col('createdAt')), month) },
          { createdAt: sequelize.where(sequelize.fn("year", sequelize.col('createdAt')), year) }
        ]
      }
    });
    return transactions;
  }
}
