import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import IContext from "../interfaces/IContext";
import ITransaction from "../interfaces/ITransaction";
import IUser from "../interfaces/IUser";
import requestApi from "../utils/requestApi";

const defaultContext: IContext = {
  user: {
    username: "",
    accountId: 0,
    account: {
      id: 0,
      balance: 0,
    },
  },
  getToken: function (): void {
    throw new Error("Function not implemented.");
  },
  token: "",
  changeBalance: function (value: number): void {
    throw new Error("Function not implemented.");
  },
  transactions: [],
  addTransaction: function (value: ITransaction): void {
    throw new Error("Function not implemented.");
  },
  updateTransactions: function (value: ITransaction[]): void {
    throw new Error("Function not implemented.");
  },
};

const Context = createContext<IContext>(defaultContext);

export default Context;

export function ContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<IUser>({
    account: { balance: 0, id: 0 },
    username: "",
    accountId: 0,
  });
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        const { data } = await requestApi(
          "GET",
          "user",
          {},
          { authorization: token }
        );
        setUser(data);
      }
    };
    getUserData();
  }, [token]);

  useEffect(() => {
    const getTransactions = async () => {
      if (token) {
        const { data } = await requestApi(
          "GET",
          "transaction",
          {},
          { authorization: token }
        );
        setTransactions(data);
      }
    };
    getTransactions();
  }, [token]);

  const getToken = () => {
    const storageToken = localStorage.getItem("token") || "";
    setToken(storageToken);
  };

  const changeBalance = (value: number) => {
    setUser((oldUser) => ({
      ...oldUser,
      account: {
        id: oldUser.account.id,
        balance: oldUser.account.balance - value,
      },
    }));
  };

  const addTransaction = (value: ITransaction) => {
    setTransactions((oldTransactions) => {
      return [...oldTransactions, value];
    });
  };

  const updateTransactions = (value: ITransaction[] | []) => {
    setTransactions(value);
  };

  const contextValue = {
    user,
    getToken,
    token,
    changeBalance,
    transactions,
    addTransaction,
    updateTransactions,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
