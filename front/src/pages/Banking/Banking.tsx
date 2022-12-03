import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import FormTransfer from "../../components/FormTransfer";
import Transactions from "../../components/Transactions";
import AuthContext from "../../context/Context";
import logo from "../../imgs/logo.svg";
import { getInfoUser, getTransactionUser } from "../../services/banking";
import style from "./style.module.css";

const Banking = () => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState({ username: "Usuário", account: { balance: "0000" } });
  const [userTransactions, setUserTransactions] = useState([
    { createdAt: "", credited: { User: [{ username: "" }] }, debited: { User: [{ username: "" }] }, value: "", id: "" },
  ]);

  const [order, setOrder] = useState("desc");
  const [orderText, setOrderText] = useState("Desc");
  const [typeTransactionText, setTypeTransactionText] = useState("TODAS");

  const changeOrder = () => {
    if (orderText === "Asc") {
      setOrder("desc");
      setOrderText("Desc");
      setUserTransactions((prev) => prev.reverse());
      return;
    }
    setOrder("asc");
    setOrderText("Asc");
    setUserTransactions((prev) => prev.reverse());
    return;
  };

  const changeType = () => {
    if (typeTransactionText === "TODAS") {
      setTypeTransactionText("CASH-IN");
      getTransactionUser(order, "credit").then((data) => setUserTransactions(data));
      return;
    }
    if (typeTransactionText === "CASH-IN") {
      setTypeTransactionText("CASH-OUT");
      getTransactionUser(order, "debit").then((data) => setUserTransactions(data));
      return;
    }
    setTypeTransactionText("TODAS");
    getTransactionUser(order, "all").then((data) => setUserTransactions(data));
    return;
  };

  const handleLogout = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    authCtx.onLogout();
  };

  const onTransferUser = (info: any) => {
    setUserData(info);
  };
  const onTransferTransaction = (info: any) => {
    setUserTransactions(info);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const dataUser = await getInfoUser();
      const dataTransactionUser = await getTransactionUser();
      setUserData(dataUser);
      setUserTransactions(dataTransactionUser);
    };
    fetchUserInfo();
  }, []);

  return (
    <div className={style.container}>
      <header className={style.headerConnected}>
        <img src={logo} alt="" />
        <Button innerText="Logout" onClick={handleLogout} />
      </header>
      <main>
        <div className={style.balance}>
          <h2>Olá, {userData.username}</h2>
          <div className={style.containerBalance}>
            <h2>Saldo disponível:</h2>
            <p>R$ {userData.account.balance}</p>
          </div>
        </div>
        <div className={style.containerMain}>
          <div className={style.history}>
            <div className={style.containerButton}>
              <Button innerText={orderText} onClick={changeOrder} />
              <Button innerText={typeTransactionText} onClick={changeType} />
            </div>
            <Transactions userData={userData} userTransactions={userTransactions} />
          </div>
          <div className={style.transfer}>
            <h1>Transferir</h1>
            <FormTransfer
              buttonText="Transferir"
              onTransferUser={onTransferUser}
              onTransferTransaction={onTransferTransaction}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Banking;
