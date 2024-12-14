import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLogged ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            <Login setIsLogged={setIsLogged} setIsRegister={setIsRegister} />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setIsLogged={setIsLogged}
              isRegister={isRegister}
              setIsRegister={setIsRegister}
            />
          }
        />
        <Route path="/home" element={<Home setIsLogged={setIsLogged} />} />
      </Routes>
    </Router>
  );
}

export default App;
