import styles from "./Register.module.scss";

export function Register() {
  return (
    <form id={styles.registerForm}>
      <h1>Register</h1>

      <input id="email" placeholder="Enter your email" />
      <input id="name" placeholder="Enter name" />
      <input id="age" placeholder="Enter your age" />

      <div>
        <input type="password" id="password" placeholder="Enter password" />
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
