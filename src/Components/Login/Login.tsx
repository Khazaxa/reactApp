import styles from "./Login.module.scss";
import { useState } from "react";

const correctLogin = "admin@gmail.com";
const correctPassword = "admin";

export function Login({
  setIsLogged,
}: {
  setIsLogged: (isLogged: boolean) => void;
}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (login === correctLogin && password === correctPassword) {
      console.log(`Login successful ${login} ${password}`);
      setIsLogged(true);
    } else {
      console.log(`Bad ${login} ${password}`);
      setIsLogged(false);
    }
  }

  const handleRegisterButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
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
      </form>
    </>
  );
}
