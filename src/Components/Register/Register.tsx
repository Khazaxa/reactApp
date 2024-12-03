import { useState } from "react";
import appStyles from "../../App.module.scss";
import styles from "./Register.module.scss";
import { Login } from "../Login/Login";
import api from "../../ApiConfig/ApiConfig";

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
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const response = await api.post("/auth/register", {
      email: email,
      name: name,
      age: age,
      password: password,
      confirmPassword: password2,
    });

    if (response.status === 200) {
      setIsRegister(true);
    } else {
      setErrorMessage("Registration failed. Please try again.");
      setIsRegister(false);
    }
  };

  return (
    <>
      {isRegister ? (
        <Login setIsLogged={setIsLogged} setIsRegister={setIsRegister} />
      ) : (
        <form id={styles.registerForm} onSubmit={handleSubmit}>
          <div id={styles.header}>
            <button onClick={() => setIsRegister(true)}>X</button>
          </div>
          <h1>Register</h1>

          <input
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="name"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            id="age"
            placeholder="Enter your age"
            onChange={(e) => setAge(Number(e.target.value))}
          />

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
