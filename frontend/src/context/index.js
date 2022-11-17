import React, { createContext, useState, useEffect } from "react";
import requestApi from '../utils/requestApi';

const Context = createContext();

export default Context;

export function ContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    account: { balance: 0 },
    username: ''
  });
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    setToken(storageToken);
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        const { data } = await requestApi('GET', 'user', {}, { authorization: token });
        setUser(data);
      }
    }
    getUserData();
  }, [token])

  useEffect(() => {
    const getTransactions = async () => {
      if (token) {
        const { data } = await requestApi('GET', 'transaction', {}, { authorization: token });
        setTransactions(data);
      }
    }
    getTransactions();
  }, [token])

  const changeBalance = (value) => {
    setUser((oldUser) => ({
      ...oldUser,
      account: {
        id: oldUser.account.id,
        balance: oldUser.account.balance - value,
      }
    }))
  }

  const addTransaction = (value) => {
    setTransactions((oldTransactions) => {
      return [...oldTransactions, value];
    })
  }

  const contextValue = {
    user,
    token,
    changeBalance,
    transactions,
    addTransaction
  }

  return(
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  )
}