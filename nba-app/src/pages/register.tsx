import styles from "../styles/login.module.css";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import { useState } from "react";
import { registerValidate } from "../../lib/validate";
import { useRouter } from "next/router";

interface Submission {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
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

  async function onSubmit(values: Submission) {
    if (Object.keys(formik.errors).length === 0) {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data) router.push("http://localhost:3000");
    } else {
      console.log(formik.errors);
    }    
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
