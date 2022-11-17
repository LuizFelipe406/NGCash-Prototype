import React, { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Context from "../../context";

function WalletInfo() {
  const { user } = useContext(Context);
    return (
      <div>
        <h1>
          perfil <AiOutlineArrowLeft />
        </h1>
        <div className="wallet-username white-box mb-5">
          <span>{ user && `@${user.username}`}</span>
        </div>
        <h1>
          carteira <AiOutlineArrowLeft />
        </h1>
        <div className="wallet-info mb-5">
          <span className="ms-3">saldo disponível</span>
          <span className="me-3">{user && `R$ ${user.account.balance.toFixed(2)}`}</span>
        </div>
      </div>
    );
}

export default WalletInfo
