import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Context from "../../../context";
import "./UserInfo.css";

function UserInfo() {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  return (
    <div className="user-info-container">
      <h1 className="title">
        perfil <AiOutlineArrowLeft />
      </h1>
      <div className="text profile-container white-box mb-3">
        <span>{user && `@${user.username}`}</span>
      </div>
      <button
        onClick={logout}
        type="button"
        className="white-box text profile-logout-btn mb-3"
      >
        Sair
      </button>
      <h1 className="title">
        carteira <AiOutlineArrowLeft />
      </h1>
      <div className="wallet-container text mb-5">
        <span className="ms-3">saldo disponível</span>
        <span className="me-3">
          {user && `R$ ${user.account.balance.toFixed(2)}`}
        </span>
      </div>
    </div>
  );
}

export default UserInfo;
