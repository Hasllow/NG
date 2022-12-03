import { useState } from "react";
import { createTransactionUser, getInfoUser, getTransactionUser } from "../services/banking";
import Button from "./Button";
import { ResponseAPI } from "./Form";
import styles from "./FormTransfer.module.css";
import ResponseContainer from "./ResponseContainer";

const Form = (props: {
  buttonText: string;
  onTransferUser: CallableFunction;
  onTransferTransaction: CallableFunction;
}) => {
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");

  const [responseStatus, setResponseStatus] = useState<ResponseAPI | null>();

  const handleCloseContainer = () => {
    setResponseStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: ResponseAPI = await createTransactionUser({ username, value });
      setResponseStatus(response);
      setUsername("");
      setValue("");

      const dataUser = await getInfoUser();
      const dataTransactionUser = await getTransactionUser();
      props.onTransferUser(dataUser);
      props.onTransferTransaction(dataTransactionUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {responseStatus ? (
        <ResponseContainer responseStatus={responseStatus} onCloseContainer={handleCloseContainer} />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor"
            min="0.01"
            step="0.01"
          />
          <Button type="submit" innerText={props.buttonText} />
        </form>
      )}
    </>
  );
};

export default Form;
