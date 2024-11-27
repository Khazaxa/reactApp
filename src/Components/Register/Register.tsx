import { useState } from "react";
import appStyles from "../../App.module.scss";
import styles from "./Register.module.scss";
import { Login } from "../Login/Login";

export function Register({
  setIsLogged,
  isRegister,
  setIsRegister,
}: {
  setIsLogged: (isRegister: boolean) => void;
  isRegister: boolean;
  setIsRegister: (isRegister: boolean) => void;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address");
    } else if (validatePassword(password) === false) {
      setErrorMessage(
        "Password must contain at least 6 characters, including uppercase, lowercase, number and special character"
      );
    } else if (password !== password2) {
      setErrorMessage("Passwords do not match");
    }
    setIsRegister(true);
  };

  return (
    <>
      {isRegister ? (
        <Login setIsLogged={setIsLogged} setIsRegister={setIsRegister} />
      ) : (
        <form id={styles.registerForm} onSubmit={handleSubmit}>
          <h1>Register</h1>

          <input
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input id="name" placeholder="Enter name" />
          <input id="age" placeholder="Enter your age" />

          <div>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              id="password2"
              placeholder="Enter password again"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
          <strong className={appStyles.errorMessage}>{errorMessage}</strong>
        </form>
      )}
    </>
  );
}
