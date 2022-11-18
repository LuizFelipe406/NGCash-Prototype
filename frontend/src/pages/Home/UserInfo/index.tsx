import React, { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Context from "../../../context";
import './UserInfo.css';

function UserInfo() {
  const { user } = useContext(Context);
    return (
      <div>
        <h1 className="title">
          perfil <AiOutlineArrowLeft />
        </h1>
        <div className="text profile-container white-box mb-5">
          <span>{ user && `@${user.username}`}</span>
        </div>
        <h1 className="title">
          carteira <AiOutlineArrowLeft />
        </h1>
        <div className="wallet-container text mb-5">
          <span className="ms-3">saldo disponível</span>
          <span className="me-3">{user && `R$ ${user.account.balance.toFixed(2)}`}</span>
        </div>
      </div>
    );
}

export default UserInfo
