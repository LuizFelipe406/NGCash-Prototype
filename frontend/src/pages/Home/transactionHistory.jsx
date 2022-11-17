import React, { useContext } from "react";
import { BsFillBagPlusFill, BsBagDashFill } from "react-icons/bs";
import { AiOutlineArrowDown } from "react-icons/ai";
import Context from "../../context";
import "./transaction.css";

function TransactionHistory() {
  const { transactions, user } = useContext(Context);

  return (
    <div className="table-container">
      <h1 className="table-title light-color-text">
        histórico de transações <AiOutlineArrowDown />
      </h1>
      <table className="table">
        <tbody>
          {transactions.map((transaction) => {
            const date = new Date(transaction.createdAt);
            const isDebit = transaction.debitedAccountId === user.accountId;
            return (
              <tr key={transaction.id}>
                <th>{isDebit ? <BsBagDashFill /> : <BsFillBagPlusFill />}</th>
                <th>{isDebit ? "cash-out" : "cash-in"}</th>
                <th
                  className={isDebit ? "text-danger" : "green-text"}
                >{`R$ ${transaction.value.toFixed(2)}`}</th>
                <th>
                  {date.getDate() +
                    " " +
                    date.toLocaleString("en-us", { month: "short" }) +
                    " " +
                    date.getFullYear()}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
