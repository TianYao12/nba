import axios from "axios";
import Link from "next/link";
import styles from "../styles/news.module.css";
import { useState } from "react";
import Login from "../pages/login";
import { getSession, useSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";

interface News {
  url: string;
  urlToImage: string;
  title: string;
}

interface NewsPageProps {
  news: News[];
}

const HomePage = ({ news }: NewsPageProps) => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <>
      {session ? (
        <>
          <div className={styles.title}>
            <h1> {session.user?.email}'s NBA News</h1> 
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
