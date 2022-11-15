import { DataTypes, Model } from 'sequelize';
import Account from './Account';
import sequelize from './index';

class Transaction extends Model {
  declare id: number;
  declare debitedAccountId: number;
  declare creaditedAccountId: number;
  declare value: number;
  declare createdAt: Date;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  creaditedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  underscored: true,
  modelName: 'Transaction',
  tableName: 'Transactions',
  timestamps: false,
  sequelize: sequelize,
});

Account.hasMany(Transaction, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Account.hasMany(Transaction, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });

Transaction.belongsTo(Account, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Transaction.belongsTo(Account, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });

export default Transaction;