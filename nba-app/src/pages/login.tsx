import styles from "../styles/login.module.css";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import { useState } from "react";
import loginValidate from "../../lib/validate";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Submission {
  email: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: loginValidate,
    onSubmit,
  });

  async function onSubmit(values: Submission) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "http://localhost:3000",
    });
    if (status.ok) router.push(status.url);
  }

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
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder={t("email")}
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? ( // formik.touched.email is if the email was typed and you click off
            <span>{formik.errors.email}</span>
          ) : (
            <></>
          )}
        </div>
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
