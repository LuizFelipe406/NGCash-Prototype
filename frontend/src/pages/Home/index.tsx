import React, { useContext, useEffect } from "react";
import UserInfo from "./UserInfo/index";
import TransactionForm from "./TransactionForm/index";
import TransactionHistory from "./TransactionHistory/index";
import Context from "../../context";
import logo from "../../images/logo-ngcash-branco.svg";
import "./home.css";

function Home() {
  const { getToken } = useContext(Context);

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <div className="home-container default-page">
      <header className="fixed-top header header-home mt-4">
        <div className="d-flex align-items-center justify-content-center">
          <img src={logo} alt="logo-ng" className="logo ms-5" />
        </div>
      </header>
      <div className="light-color-text left-content-container">
        <UserInfo />
        <TransactionForm />
      </div>
      <TransactionHistory />
    </div>
  );
}

export default Home;
