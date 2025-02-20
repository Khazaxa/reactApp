import { useState } from "react";
import styles from "./Register.module.scss";
import api from "../../ApiConfig/ApiConfig";
import { Login } from "../Login/Login";
import Notifications from "../Notifications/Notifications";

export function Register({
  setIsLogged,
  isRegister,
  setIsRegister,
}: {
  setIsLogged: (isRegister: boolean) => void;
  isRegister: boolean;
  setIsRegister: (isRegister: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);
  const notificationDelay = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  };

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      setMessage("Invalid email address");
      setMessageType("error");
      notificationDelay();
    } else if (validatePassword(password) === false) {
      setMessage(
        "Password must contain at least 6 characters, including uppercase, lowercase, number and special character"
      );
      setMessageType("error");
      notificationDelay();
    } else if (password !== password2) {
      setMessage("Passwords do not match");
      setMessageType("error");
      notificationDelay();
    } else {
      try {
        const response = await api.post("/auth/register", {
          email: email,
          name: name,
          age: age,
          password: password,
          confirmPassword: password2,
        });

        if (response.status === 200) {
          setIsRegister(true);
          setMessage("Registration succesfull.");
          setMessageType("success");
          notificationDelay();
        } else {
          setMessage("Registration failed. Please try again.");
          setMessageType("error");
          notificationDelay();
          setIsRegister(false);
        }
      } catch {
        setMessage("Registration failed. Please try again.");
        setMessageType("error");
        notificationDelay();
        setIsRegister(false);
      }
    }
  };

  return (
    <div id={styles.registerPage}>
      <Notifications messageType={messageType} message={message} />
      {isRegister ? (
        <Login setIsLogged={setIsLogged} setIsRegister={setIsRegister} />
      ) : (
        <form id={styles.registerForm} onSubmit={handleSubmit}>
          <button id={styles.closeFormBtn} onClick={() => setIsRegister(true)}>
            X
          </button>
          <h1>Register</h1>

          <input
            id="email"
            placeholder="Email"
            className={styles.inputGroup}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="name"
            placeholder="Name"
            className={styles.inputGroup}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            id="age"
            placeholder="Age"
            className={styles.inputGroup}
            onChange={(e) => setAge(Number(e.target.value))}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={styles.inputGroup}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            id="password2"
            placeholder="Password again"
            className={styles.inputGroup}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <button id={styles.btnSubmit} type="submit">
            Register
          </button>
        </form>
      )}
    </div>
  );
}
