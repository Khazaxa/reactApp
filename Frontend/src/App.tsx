import Home from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  return (
    <>
      {isRegister ? (
        isLogged ? (
          <Home setIsLogged={setIsLogged} />
        ) : (
          <Login setIsLogged={setIsLogged} setIsRegister={setIsRegister} />
        )
      ) : (
        <Register
          setIsLogged={setIsLogged}
          isRegister={isRegister}
          setIsRegister={setIsRegister}
        />
      )}
    </>
  );
}

export default App;
