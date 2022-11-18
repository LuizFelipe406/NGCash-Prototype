import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Context from "../../../context";
import requestApi from "../../../utils/requestApi";
import "./TransactionForm.css";

function TransactionForm() {
  const { user, token, changeBalance, addTransaction } = useContext(Context);
  const [username, setUsername] = useState("");
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (user && Number(value) > Number(user.account.balance)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [user, value]);

  const handleUsernameChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setUsername(value);
  };

  const handleValueChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setValue(value);
  };

  const clearInputs = () => {
    setUsername("");
    setValue("");
    setUsernameInvalid(false);
  };

  const transfer = async () => {
    const { status, data } = await requestApi(
      "POST",
      "transaction",
      { username, value: Number(value) },
      { authorization: token }
    );

    if (status === 200) {
      changeBalance(Number(value));
      addTransaction({
        ...data,
        debitedUsername: user.username,
        creditedUsername: username,
      });
      clearInputs();
    }

    if (status === 400) {
      setUsernameInvalid(true);
    }
  };

  return (
    <div>
      <h1 className="title">
        transferência <AiOutlineArrowLeft />
      </h1>
      <Form>
        <Form.Control
          className="transaction-username-input text mb-3"
          value={username}
          type="text"
          isInvalid={usernameInvalid}
          placeholder="Usuario"
          onChange={handleUsernameChange}
        />
        <div className="white-box text transaction-value-container mb-4">
          <span>R$</span>
          <input
            className="transaction-value-input text ms-1"
            value={value}
            type="number"
            placeholder="0.00"
            onChange={handleValueChange}
          />
        </div>
        <div className="transaction-btn-container">
          <button
            type="button"
            className="white-box text transaction-btn me-2"
            onClick={clearInputs}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={transfer}
            className="white-box text transaction-btn ms-2"
            disabled={isDisabled}
          >
            Transferir
          </button>
        </div>
      </Form>
    </div>
  );
}

export default TransactionForm;
