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
            value
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

  async getTransactionsByFilter(type: typeQueryFilter[], day: string | undefined, month: string | undefined, year: string | undefined) {
    const transactions = await Transaction.findAll({
      where: {
        [Op.and]: [
          { [Op.or]: type },
          { createdAt: day ? sequelize.where(sequelize.fn("date_part", "day", sequelize.col('created_at')), Number(day)) : { [Op.not]: null } },
          { createdAt: month ? sequelize.where(sequelize.fn("date_part", "month", sequelize.col('created_at')), Number(month)) : { [Op.not]: null } },
          { createdAt: year ? sequelize.where(sequelize.fn("date_part", "year", sequelize.col('created_at')), Number(year)) : { [Op.not]: null } }
        ]
      }
    });
    return transactions;
  }
}
