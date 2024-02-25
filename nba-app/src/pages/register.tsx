import styles from "../styles/login.module.css";
import { useFormik } from "formik";
import { registerValidate } from "../../lib/validate";
import { useRouter } from "next/router";
import Link from "next/link"
import { useTranslation } from "react-i18next";

interface Submission {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
// Register registers a new user 
const Register = () => {
  const { t } = useTranslation();
  const router = useRouter();

  /**
   * Formik calls 'validate' function whenever form values change or on submission 
   * It returns an object where the keys correspond to form field names, and the values are 
   * error messages (or undefined if there are no errors).
   * OnSubmit function is called upon submission of form
   */
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

  // onSubmit(values) handles form submission
  async function onSubmit(values: Submission) {
    // if there are no validation errors
    if (Object.keys(formik.errors).length === 0) {
      // send POST request to Next.js signup API endpoint
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json(); // parse response JSON
      if (data) router.push("http://localhost:3000"); // redirect if successful
    } else {
      console.log(formik.errors);
    }    
  }

  return (
    <div className={styles.title}>
      <h1>{t("register")} {t("in")} NBAExplorer</h1>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder={t("username")}
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
          {/* Email */}
          <input
            className={styles.inputBox}
            placeholder={t("email")}
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            formik.errors.email
          ) : (
            <></>
          )}
        </div>
         {/* Password */}
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder={t("password")}
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password ? (
            formik.errors.password
          ) : (
            <></>
          )}
        </div>
         {/* Confirm Password */}
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder={t("confirm")+ " "+ t("password")}
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
          {t("register")}
        </button>
        <p className={styles.end}>
        {t("yes-account")}? <Link href="/login">{t("login")}</Link>
      </p>
      </form>
    </div>
  );
};

export default Register;
