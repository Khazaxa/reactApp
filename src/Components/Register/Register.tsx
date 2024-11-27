import styles from "./Register.module.scss";

export function Register() {
  return (
    <form id={styles.registerForm}>
      <h1>Register</h1>
      <div>
        <input id="email" placeholder="Enter your email" />
        <input id="name" placeholder="Enter your name" />
        <input id="age" placeholder="Enter your age" />
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        <input
          type="password"
          id="password2"
          placeholder="Enter password again"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
