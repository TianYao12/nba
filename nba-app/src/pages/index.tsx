import axios from "axios";
import Link from "next/link";
import styles from "../styles/news.module.css";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n"

interface News {
  url: string;
  urlToImage: string;
  title: string;
}

interface NewsPageProps {
  news: News[];
}
// HomePage(news) renders NBA news fetched from Next.js API route and is the default page after authentication 
const HomePage = ({ news }: NewsPageProps) => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  // console.log(session);
  
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
          {/*Grid layout of NBA news */}
          <div className={styles.grid}>
            {news.length > 0 ? (
              news.map((article) =>
                article.urlToImage ? (
                  <div className={styles.item} key={article.title}>
                    <Link href={article.url} className={styles.link}>
                      <img src={article.urlToImage} alt={article.title} />
                      <p style={{fontSize:"1rem"}}>{article.title}</p>
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

// getServerSideProps(context) renders news at request time as long as user is still in session
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
    // fetches from Next.js API route NBA news
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
