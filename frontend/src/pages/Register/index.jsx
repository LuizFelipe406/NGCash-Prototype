import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from "react-router-dom";
import walletApi from "../../utils/requestApi";
import logo from "../../images/logo-ngcash-branco.svg";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./register.css";


function Register() {
  const [username, setUsername] = useState('')
  const [usernameValid, setUsernameValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [registerSuccesfull, setRegisterSuccesfull] = useState('did not try yet');
  const navigate = useNavigate();

  useEffect(() => {
      const enabledButton = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const minimumUsername = 3;
        if (username.length >= minimumUsername) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }

        if (password.match(passwordRegex)) {
          setPasswordValid(true);
        } else {
          setPasswordValid(false);
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
  
  const register = async () => {
      const { status, data } = await walletApi('POST', 'user', { username, password });
      console.log(data);
      console.log(status);

      if(status === 400) {
          setRegisterSuccesfull(false);
      }
      
      if(status === 201) {
          navigate("/");
      }
  }

  return(
    <div className="default-page">
      <header className="fixed-top header mt-4">
        <div className="ms-5 ps-5 d-flex align-items-center">
          <img src={ logo } alt="logo-ng" className="logo ms-5" />
        </div>
      </header>
      <div className="login-form-container mb-5">
        <h4 className="left-subtitle title ms-5 ps-2">PARA TODAS AS IDADES</h4>
        <h1
          className="left-title title light-color-text ms-4 ps-4 mt-3 mb-4"
        >
          A CARTEIRA DA NOVA GERAÇÃO.
        </h1>
        <h4 className="left-subtitle title ms-5 ps-2 mb-5">Digite um Usuario e Senha</h4>
        <Form className="form-container">
          <FloatingLabel
            controlId="floatingInput"
            label="Usuario"
            className="mb-3 light-color-text login-input-container"
          >
            <Form.Control
              size="lg"
              value={ username }
              type="text"
              placeholder="Usuario"
              isInvalid={ !usernameValid }
              isValid= { usernameValid }
              className="login-input"
              onChange={ handleUsernameChange }
            />
          </FloatingLabel>

          { registerSuccesfull === false && <span className="text-danger mb-3">Este usuário não está disponível</span> }

          <FloatingLabel
            controlId="floatingPassword"
            label="Senha"
            className="light-color-text mb-3 login-input-container"
          >
            <Form.Control
              size="lg"
              type="password"
              className="login-input"
              placeholder="Senha"
              isInvalid={ !passwordValid }
              isValid= { passwordValid }
              value={ password }
              onChange={ handlePasswordChange }
            />
          </FloatingLabel>

          <div className="register-info-container mb-3 light-color-text">
            <span><AiOutlineInfoCircle /> Seu usuario deve possuir pelo menos 3 caracteres</span>
            <span><AiOutlineInfoCircle /> Sua senha deve possuir pelo menos 8 caracteres</span>
            <span><AiOutlineInfoCircle /> Sua senha deve possuir pelo menos um número</span>
            <span><AiOutlineInfoCircle /> Sua senha deve possuir pelo menos uma letra maiúscula</span>
          </div>

          <div className="login-btn-container">
            <Button
              size="md"
              type="button"
              className="btn btn-create text"
              disabled={ (!passwordValid || !usernameValid) }
              onClick={ register }
            >
              Criar
            </Button>
          </div>
        </Form>
        </div>
    </div>
  );
}

export default Register