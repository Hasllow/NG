import { useContext, useState } from "react";
import AuthContext from "../context/Context";
import { loginUser } from "../services/home";
import Form, { ResponseAPI } from "./Form";
import ResponseContainer from "./ResponseContainer";

const FormLogin = () => {
  const authCtx = useContext(AuthContext);
  const [response, setResponse] = useState<ResponseAPI | null>(null);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response: ResponseAPI = await loginUser({ username, password });

      if (response && response.status === 200) {
        setTimeout(() => {
          authCtx.onLogin();
          setResponse(null);
        }, 2000);
      }
      setResponse(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseContainer = () => {
    setResponse(null);
  };

  return (
    <>
      {response ? (
        <ResponseContainer responseStatus={response} onCloseContainer={handleCloseContainer} />
      ) : (
        <Form buttonText="Login" onConnect={handleLogin} title="Faça o login" />
      )}
    </>
  );
};

export default FormLogin;
