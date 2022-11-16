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

  const changeBalance = (value) => {
    setUser((oldUser) => ({
      ...oldUser,
      account: {
        id: oldUser.account.id,
        balance: oldUser.account.balance - value,
      }
    }))
  }

  const contextValue = {
    user,
    token,
    changeBalance
  }

  return(
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  )
}