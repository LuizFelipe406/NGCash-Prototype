import { DataTypes, Model } from 'sequelize';
import Account from './Account';
import sequelize from './index';

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare accountId: number;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  underscored: true,
  modelName: 'User',
  tableName: 'Users',
  timestamps: false,
  sequelize: sequelize,
});

Account.hasOne(User, { foreignKey: 'accountId', as: 'account' });

User.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });

export default User;