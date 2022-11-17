import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from "react-router-dom";
import walletApi from "../../utils/requestApi";
import logo from "../../images/logo-ngcash-branco.svg";
import "./login.css";


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [LoginSuccesfull, setLoginSuccesfull] = useState('did not try yet');
  const navigate = useNavigate();

  useEffect(() => {
      const enabledButton = () => {
        const minimumPassword = 8;
        const minimumUsername = 3;
  
        if (username.length >= minimumUsername && password.length >= minimumPassword) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
      };
  
      enabledButton();
    }, [username, password]);
  
  const handleUsernameChange = ({ target }) => {
    const { value } = target;
    setUsername(value);
  };
  
  const handlePasswordChange = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };
  
  const login = async () => {
      const { status, data } = await walletApi('POST', 'login', { username, password });

      if(status === 401) {
          setLoginSuccesfull(false);
      }
      
      if(status === 200) {
          localStorage.setItem('token', data.token);
          navigate("/home");
      }
  }

  return(
    <div className="default-page">
      <header className="fixed-top header mt-4">
        <div className="ms-5 ps-5 d-flex align-items-center">
          <img src={ logo } alt="logo-ng" className="logo ms-5" />
        </div >
      </header>
      <div className="login-form-container mb-5">
        <h4 className="left-subtitle title ms-5 ps-2">PARA TODAS AS IDADES</h4>
        <h1
          className="left-title title light-color-text ms-4 ps-4 mt-3 mb-4"
        >
          A CARTEIRA DA NOVA GERAÇÃO.
        </h1>
        <h4 className="left-subtitle title ms-5 ps-2 mb-5 pb-4">Digite seu Usuario e Senha</h4>
        <Form className="form-container">
          <FloatingLabel
            controlId="floatingInput"
            label="Usuario"
            className="mb-3 light-color-text login-input-container text"
          >
            <Form.Control
              size="lg"
              value={ username }
              type="text"
              placeholder="Usuario"
              className="login-input"
              isInvalid={ !LoginSuccesfull }
              onChange={ handleUsernameChange }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Senha"
            className="light-color-text mb-3 login-input-container text"
          >
            <Form.Control
              size="lg"
              type="password"
              className="login-input"
              placeholder="Senha"
              value={ password }
              isInvalid={ !LoginSuccesfull }
              onChange={ handlePasswordChange }
            />
          </FloatingLabel>

          { LoginSuccesfull === false && <span className="text-danger mb-3">Usuário ou Senha incorretos</span> }

          <div className="login-btn-container">
            <Button
              size="md"
              type="button"
              className="text btn create-account-btn light-color-text"
              onClick={() => navigate('/register')}
            >
              Cadastrar
            </Button>
            <Button
              size="md"
              type="button"
              className="text btn login-btn"
              disabled={ isDisabled }
              onClick={ login }
            >
              Login
            </Button>
          </div>
        </Form>
        </div>
    </div>
  );
}

export default Login