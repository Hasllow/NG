import { useContext, useState } from "react";
import AuthContext from "../context/Context";
import { createUser, loginUser } from "../services/home";
import Button from "./Button";
import styles from "./Form.module.css";
import ResponseContainer from "./ResponseContainer";

export type ResponseAPI = {
  title: string;
  status: number;
  type?: string;
  detail?: string;
  data?: {
    idLoggedUser: string;
    token: string;
  };
};

const Form = (props: { title?: string; typeSubmit: string; buttonText: string }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseContainerIsOpen, setResponseContainerIsOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState<ResponseAPI | null>();
  const authCtx = useContext(AuthContext);

  const handleCloseContainer = () => {
    setResponseContainerIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: ResponseAPI =
        props.typeSubmit === "login"
          ? await loginUser({ username, password })
          : await createUser({ username, password });

      if (props.typeSubmit === "login" && response && response.status === 200) {
        setTimeout(() => {
          authCtx.onLogin();
          setResponseContainerIsOpen(false);
        }, 2000);
      }
      setResponseContainerIsOpen(true);
      setResponseStatus(response);
    } catch (error) {
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
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Login" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
          <Button type="submit" innerText={props.buttonText} />
        </form>
      )}
    </>
  );
};

export default Form;
