import { useState } from "react";
import { createUser } from "../services/home";
import Form, { ResponseAPI } from "./Form";
import ResponseContainer from "./ResponseContainer";

const FormSignUp = () => {
  const [response, setResponse] = useState<ResponseAPI | null>(null);

  const handleSignUp = async (username: string, password: string) => {
    try {
      const response: ResponseAPI = await createUser({ username, password });
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
        <Form buttonText="Cadastre-se" onConnect={handleSignUp} />
      )}
    </>
  );
};
export default FormSignUp;
