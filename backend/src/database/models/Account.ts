import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Account extends Model {
  declare id: number;
  declare balance: number;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  modelName: 'Account',
  tableName: 'Accounts',
  timestamps: false,
  sequelize: sequelize,
});

export default Account;