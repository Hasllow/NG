import { useState } from "react";

import Button from "./Button";
import styles from "./Form.module.css";

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

const Form = (props: { title?: string; buttonText: string; onConnect: (username: string, password: string) => {} }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onConnect(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {props.title ? <h1>{props.title}</h1> : null}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Login" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <Button type="submit" innerText={props.buttonText} />
    </form>
  );
};
export default Form;
