import styles from "./Login.module.scss";
import appStyles from "../../App.module.scss";
import { useState } from "react";
import api from "../../ApiConfig/ApiConfig";

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginData = {
      email: login,
      password: password,
    };

    try {
      const response = await api.post("/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { accessToken } = response.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        setIsLogged(true);
      } else {
        setErrorMessage("Authentication failed. No token received.");
        setIsLogged(false);
      }
    } catch (error: unknown) {
      setErrorMessage("Authentication failed. Please try again." + error);
      setIsLogged(false);
    }
  };

  return (
    <>
      <form id={styles.loginForm} onSubmit={handleSubmit}>
        <h1>Login</h1>
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
          <button
            id={styles.btnRegister}
            onClick={(e) => {
              e.preventDefault();
              setIsRegister(false);
            }}
          >
            Register
          </button>
        </div>
        <div>
          <strong className={appStyles.errorMessage}>{errorMessage}</strong>
        </div>
      </form>
    </>
  );
}
