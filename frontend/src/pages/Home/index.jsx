import React, { useContext, useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Context from "../../context";
import logo from "../../images/logo-ngcash-branco.svg";
import requestApi from '../../utils/requestApi';
import "./home.css";

function Home() {
  const { user, token, changeBalance } = useContext(Context);
  const [username, setUsername] = useState('');
  const [usernameInvalid, setUsernameInvalid] = useState('');
  const [value, setValue] = useState('');
  const [valueValid, setValueValid] = useState('');

  useEffect(() => {
    if (Number(value) > Number(user.account.balance)) {
      setValueValid(false);
    }
  }, [user.account.balance, value])

  const handleUsernameChange = ({ target }) => {
    const { value } = target;
    setUsername(value);
  };

  const handleValueChange = ({ target }) => {
    const { value } = target;
    setValue(value);
  };

  const clearInputs = () => {
    setUsername('');
    setValue('');
    setUsernameInvalid(false);
  }

  const transfer = async () => {
    const { status } = await requestApi('POST', 'transaction', { username, value: Number(value) }, { authorization: token });
    
    if (status === 200) {
      changeBalance(value);
      clearInputs();
    }

    if (status === 400) {
      setUsernameInvalid(true);
    }
  };

  return (
    <div className="home-container">
      <header className="fixed-top header mt-4">
        <div className="d-flex align-items-center justify-content-center">
          <img src={logo} alt="logo-ng" className="logo ms-5" />
        </div>
      </header>
      <div className="light-color-text wallet-container">
        <h1>perfil <AiOutlineArrowLeft/></h1>
        <div className="wallet-username white-box mb-5">
          <span>{`@${user.username}`}</span>
        </div>
        <h1>carteira <AiOutlineArrowLeft/></h1>
        <div className="wallet-info mb-5">
          <span className="ms-3">saldo disponível</span>
          <span className="me-3">{`R$ ${user.account.balance.toFixed(2)}`}</span>
        </div>
        <h1>transferência <AiOutlineArrowLeft/></h1>
        <Form>
          <Form.Control
            className="user-input mb-3"
            value={ username }
            isInvalid={ usernameInvalid }
            type="text"
            placeholder="Usuario"
            onChange={ handleUsernameChange }
          />
          <div className="white-box value-input-container mb-4">
            <span>R$</span>
            <Form.Control
              className="value-input"
              size="lg"
              value={ value }
              type="number"
              placeholder="0.00"
              onChange={ handleValueChange }
            />
          </div>
          <div className="btn-container">
            <Button
              type="button"
              variant="light"
              className="white-box btn-wallet me-2"
              onClick={ clearInputs }
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="light"
              onClick={ transfer }
              className="white-box btn-wallet ms-2"
              disabled={ valueValid && usernameInvalid }
            >
              Transferir
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Home;
