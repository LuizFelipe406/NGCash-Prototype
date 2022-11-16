import UserModel from "../models/UserModel";
import bcrypt = require("bcryptjs");
import CustomError, { CustomErrorParams } from "../utils/CustomError";
import userSchema from "../utils/joi/userSchema";
import User from "../database/models/User";

export default class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async create(username: string, password: string): Promise<User> {
    const error = await this.validations(username, password);
    if (error) throw new CustomError(error.message, error.status);

    const hashPassword = bcrypt.hashSync(password, 10);
    try {
      const newUser = await this.userModel.create(username, hashPassword);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  private async validations(
    username: string,
    password: string
  ): Promise<CustomErrorParams | undefined> {
    let error = undefined;

    error = this.verifyParams(username, password);
    if (error) return error;

    error = await this.verifyUsername(username);
    return error;
  }

  private verifyParams(
    username: string,
    password: string
  ): CustomErrorParams | undefined {
    const { error } = userSchema.validate({ username, password });
    if (error) return { status: 400, message: error.message };
    return undefined;
  }

  private async verifyUsername(
    username: string
  ): Promise<CustomErrorParams | undefined> {
    const user = await this.userModel.getUserByUsername(username);
    if (user) return { status: 400, message: "username already used" };
    return undefined;
  }
}
