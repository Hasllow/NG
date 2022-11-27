import { useContext } from "react";
import "./App.css";
import AuthContext from "./context/Context";
import Banking from "./pages/Banking/Banking";
import Home from "./pages/Home/Home";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      {!authCtx.isLoggedIn && <Home />}
      {authCtx.isLoggedIn && <Banking />}
    </div>
  );
}

export default App;
