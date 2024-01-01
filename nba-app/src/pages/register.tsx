import styles from "../styles/login.module.css";

const Register = () => {
  return (
    <div className={styles.title}>
      <h1>Register to NBAExplorer</h1>
      <input className={styles.inputBox} placeholder="Email" />
      <input
        className={styles.inputBox}
        placeholder="Password"
        type="password"
      />
      <input
        className={styles.inputBox}
        placeholder="Confirm Password"
        type="password"
      />
      <button type="submit" className={styles.button}>
        Register
      </button>
    </div>
  );
};

export default Register;
