import User from "../../../database/models/User";

const mockUser = new User({
  id: 1,
  username: 'usuario',
  password: '$2a$10$PVBVcBxfcotz3bzyLjNVLuQ.dkgP.H78YDXL8v7JGvF7.d.ZdSriC', //1234567A
  accountId: 1
});

const mockUser2 = new User({
  id: 2,
  username: 'usuario 2',
  password: '$2a$10$PVBVcBxfcotz3bzyLjNVLuQ.dkgP.H78YDXL8v7JGvF7.d.ZdSriC', //1234567A
  accountId: 2
});

export { mockUser, mockUser2 };