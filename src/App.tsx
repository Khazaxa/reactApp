import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { useState } from "react";
import { Register } from "./Components/Register/Register";

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
