import React from "react";
import logo from "../../images/logo-ngcash-branco.svg";
import WalletInfo from "./walletInfo";
import WalletTransfer from "./walletTransfer";
import TransactionHistory from "./transactionHistory";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="fixed-top header mt-4">
        <div className="d-flex align-items-center justify-content-center">
          <img src={logo} alt="logo-ng" className="logo ms-5" />
        </div>
      </header>
      <div className="light-color-text wallet-container">
        <WalletInfo />
        <WalletTransfer />
      </div>
      <TransactionHistory />
    </div>
  );
}

export default Home;
