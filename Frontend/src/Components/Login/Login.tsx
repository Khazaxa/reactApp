import styles from "./Login.module.scss";
import { useState } from "react";
import api from "../../ApiConfig/ApiConfig";
import Notifications from '../Notifications/Notifications';

export function Login({
  setIsLogged,
  setIsRegister,
}: {
  setIsLogged: (isLogged: boolean) => void;
  setIsRegister: (isRegister: boolean) => void;
}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "warning" | null>(null);
  const notificationDelay = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  }

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
      const { userId } = response.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        setIsLogged(true);

      } else {
        setIsLogged(false);
      }
    } catch {
      setMessage("Authentication failed. Please try again.");
      setMessageType("error");
      notificationDelay();
    }
  };

  return (
    <div id={styles.loginPage}>
      <Notifications messageType={messageType} message={message} />
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
          <div>
            <p>Don't have an account?</p>
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
        </div>
      </form>
    </div>
  );
}
