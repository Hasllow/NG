import React, { useEffect, useState } from "react";
import { verifyToken } from "../services/useToken";

type TypeAuthContext = {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<TypeAuthContext>({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkToken = async () => {
      const response = await verifyToken();
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
