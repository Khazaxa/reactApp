import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return <>{isLogged ? <Home /> : <Login setIsLogged={setIsLogged} />}</>;
}

export default App;
