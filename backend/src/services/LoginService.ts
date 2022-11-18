import bcrypt = require("bcryptjs");
import JWT from "../auth/JWT";
import UserModel from "../models/UserModel";
import CustomError from "../utils/CustomError";

export default class LoginService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async login(username: string, password: string) {
    if (!username || !password) throw new CustomError("fields missing", 400);

    const user = await this.userModel.getUserByUsername(username);
    if (!user) throw new CustomError("invalid credentials", 401);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) throw new CustomError("invalid credentials", 401);

    return JWT.generateToken(user);
  }
}
