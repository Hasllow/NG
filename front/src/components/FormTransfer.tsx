import { useState } from "react";
import { createTransactionUser, getInfoUser, getTransactionUser } from "../services/banking";
import Button from "./Button";
import { ResponseAPI } from "./Form";
import styles from "./FormTransfer.module.css";
import ResponseContainer from "./ResponseContainer";

const Form = (props: {
  title?: string;
  buttonText: string;
  onTransferUser: CallableFunction;
  onTransferTransaction: CallableFunction;
}) => {
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");

  const [responseContainerIsOpen, setResponseContainerIsOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState<ResponseAPI | null>();

  const handleCloseContainer = () => {
    setResponseContainerIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: ResponseAPI = await createTransactionUser({ username, value });

      setResponseContainerIsOpen(true);
      setResponseStatus(response);

      const dataUser = await getInfoUser();
      const dataTransactionUser = await getTransactionUser();
      props.onTransferUser(dataUser);
      props.onTransferTransaction(dataTransactionUser);
      // TODO: Criar layout sucesso
    } catch (error) {
      //TODO: Criar layout erro
      console.log(error);
    }
  };

  return (
    <>
      {responseContainerIsOpen && responseStatus && (
        <ResponseContainer responseStatus={responseStatus} onCloseContainer={handleCloseContainer} />
      )}
      {!responseContainerIsOpen && (
        <form onSubmit={handleSubmit} className={styles.form}>
          {props.title ? <h1>{props.title}</h1> : ""}
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
