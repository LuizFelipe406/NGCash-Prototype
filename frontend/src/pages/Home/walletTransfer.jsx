import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Context from "../../context";
import requestApi from '../../utils/requestApi';

function WalletTransfer() {
  const { user, token, changeBalance, addTransaction } = useContext(Context);
  const [username, setUsername] = useState('');
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (user && (Number(value) > Number(user.account.balance))) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [user, value])

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
    const { status, data } = await requestApi('POST', 'transaction', { username, value: Number(value) }, { authorization: token });
    
    if (status === 200) {
      changeBalance(value);
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
      <h1>
        transferência <AiOutlineArrowLeft />
      </h1>
      <Form>
        <Form.Control
          className="user-input mb-3"
          value={username}
          type="text"
          isInvalid={ usernameInvalid }
          placeholder="Usuario"
          onChange={handleUsernameChange}
        />
        <div className="white-box value-input-container mb-4">
          <span>R$</span>
          <input
            className="value-input ms-1"
            size="lg"
            value={value}
            type="number"
            placeholder="0.00"
            onChange={handleValueChange}
          />
        </div>
        <div className="btn-container-wallet">
          <button
            type="button"
            variant="light"
            className="white-box btn-wallet me-2"
            onClick={clearInputs}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={transfer}
            className="white-box btn-wallet ms-2"
            disabled={ isDisabled }
          >
            Transferir
          </button>
        </div>
      </Form>
    </div>
  );
}


export default WalletTransfer;