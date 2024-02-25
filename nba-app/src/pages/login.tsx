import styles from "../styles/login.module.css";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import loginValidate from "../../lib/validate";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Submission {
  email: string;
  password: string;
}

// Login is the login page
const Login = () => {
  const { t } = useTranslation();
  const router = useRouter();

  /**
   * Formik calls 'validate' function whenever form values change or on submission 
   * It returns an object where the keys correspond to form field names, and the values are 
   * error messages (or undefined if there are no errors).
   * OnSubmit function is called upon submission of form
   */
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: loginValidate,
    onSubmit,
  });
  
  // onSubmit(values) redirects to URL after successful login using email and password attributes from values parameter
  async function onSubmit(values: Submission) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "http://localhost:3000",
    });
    if (status.ok) router.push(status.url);
  }

  // signin is NextAuth function that takes in login option and where to redirect after login
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  async function handleGithubLogIn() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }
  return (
    <div className={styles.title}>
      <h1 className={styles.h1}>
        {t("login")} {t("to")} NBAExplorer
      </h1>
      
      {/*Form starts */}
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.small}>
          {/*Email */}
          <input
            className={styles.inputBox}
            placeholder={t("email")}
            type="email"
            {...formik.getFieldProps("email")}
          />
          {/* formik.touched.email is if the email was typed and you click off */}
          {formik.errors.email && formik.touched.email ? ( 
            <span>{formik.errors.email}</span>
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
            <span>{formik.errors.password}</span>
          ) : (
            <></>
          )}
        </div>

        <button type="submit" className={styles.button}>
          {t("login")}
        </button>
      </form>
      <button className={styles.button} onClick={handleGithubLogIn}>
        {t("login")} {t("using")} Github
      </button>
      <button className={styles.button} onClick={handleGoogleSignIn}>
        {t("login")} {t("using")} Google
      </button>
      <p className={styles.end}>
        {t("no-account")} <Link href="/register">{t("register")}</Link>
      </p>
    </div>
  );
};

export default Login;
