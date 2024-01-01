import styles from "../styles/login.module.css";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import { useState } from "react";
import loginValidate, { registerValidate } from "../../lib/validate";
interface Submission {
  email: string;
  password: string;
}

const Register = () => {
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  console.log(formik.errors);

  async function onSubmit(values: Submission) {
    console.log(values);
  }

  return (
    <div className={styles.title}>
      <h1>Register in NBAExplorer</h1>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder="Username"
            type="string"
            {...formik.getFieldProps("username")} // does many props automatically
          />
          {formik.errors.username && formik.touched.username ? (
            formik.errors.username
          ) : (
            <></>
          )}
        </div>
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder="Email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            formik.errors.email
          ) : (
            <></>
          )}
        </div>
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder="Password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password ? (
            formik.errors.password
          ) : (
            <></>
          )}
        </div>
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder="Confirm Password"
            type="password"
            {...formik.getFieldProps("confirmPassword")}
          />
        </div>
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          formik.errors.confirmPassword
        ) : (
          <></>
        )}
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
