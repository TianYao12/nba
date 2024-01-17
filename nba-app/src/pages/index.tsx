import axios from "axios";
import Link from "next/link";
import styles from "../styles/news.module.css";
import { useState, useEffect } from "react";
import Login from "../pages/login";
import { getSession, useSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import i18n from "../../lib/i18n"

interface News {
  url: string;
  urlToImage: string;
  title: string;
}

interface NewsPageProps {
  news: News[];
}

const HomePage = ({ news }: NewsPageProps) => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);
  useEffect(() => {
    i18n.changeLanguage('zh');
  }, []);
  
  
  
  return (
    <>
      {session ? (
        <>
          <div className={styles.title}>
            <h1>
              {" "}
              {session.user?.email}'s NBA {t("news")}
            </h1>
          </div>
          <div className={styles.grid}>
            {news.length > 0 ? (
              news.map((article) =>
                article.urlToImage ? (
                  <div className={styles.item} key={article.title}>
                    <Link href={article.url} className={styles.link}>
                      <img src={article.urlToImage} alt={article.title} />
                      <p>{article.title}</p>
                    </Link>
                  </div>
                ) : null
              )
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </>
      ) : (
        <div>
          <h1>You are not signed in!</h1>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get("http://localhost:3000/api/newsget");
    const news = response.data.articles;

    return {
      props: {
        news,
        session,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        news: [],
        session,
      },
    };
  }
};

export default HomePage;
