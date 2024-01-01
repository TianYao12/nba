import styles from "../styles/login.module.css";
import { signIn, signOut } from "next-auth/react";

const Login = () => {
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  return (
    <div className={styles.title}>
      <h1>Login to NBAExplorer</h1>
      <input className={styles.inputBox} placeholder="Email" />
      <input
        className={styles.inputBox}
        placeholder="Password"
        type="password"
      />
      <button type="submit" className={styles.button}>
        Login
      </button>
      <button className={styles.button}>
        Sign in with Github
      </button>
      <button className={styles.button} onClick={handleGoogleSignIn}>Sign in with Google</button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
