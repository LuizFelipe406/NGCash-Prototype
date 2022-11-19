import Transaction from "../../../database/models/Transaction";

const transaction = new Transaction({
  id: 1,
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: 5,
  createdAt: new Date(),
});

export default transaction