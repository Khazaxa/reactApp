import styles from "./Login.module.scss";
import { useState } from "react";

const correctLogin = "admin@gmail.com";
const correctPassword = "admin";

export function Login({
  setIsLogged,
  setIsRegister,
}: {
  setIsLogged: (isLogged: boolean) => void;
  setIsRegister: (isRegister: boolean) => void;
}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    if (login === "" && password === "") {
      setErrorMessage("Provide correct username and password");
    } else if (login === "" || login !== correctLogin) {
      setErrorMessage("Username is incorrect");
    } else if (password === "" || password !== correctPassword) {
      setErrorMessage("Password is incorrect");
    }
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    validate();

    if (login === correctLogin && password === correctPassword) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }

  const handleRegisterButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegister(false);
  };

  return (
    <>
      <form id={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setLogin(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div id={styles.buttons}>
          <button id={styles.btnLogin} type="submit">
            Login
          </button>
          <button id={styles.btnRegister} onClick={handleRegisterButtonClick}>
            Register
          </button>
        </div>
        <div>
          <strong className={styles.errorMessage}>{errorMessage}</strong>
        </div>
      </form>
    </>
  );
}
