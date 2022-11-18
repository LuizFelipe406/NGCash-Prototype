import User from "../../database/models/User";

const user = new User({
  id: 1,
  username: 'usuario',
  password: '$2a$10$PVBVcBxfcotz3bzyLjNVLuQ.dkgP.H78YDXL8v7JGvF7.d.ZdSriC', //1234567A
  accountId: '1'
});

export default user;