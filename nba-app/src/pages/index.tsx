import axios from "axios";
import Link from "next/link";
import styles from "../styles/news.module.css";

interface News {
  url: string,
  urlToImage: string,
  title: string
}

interface NewsPageProps {
  news: News[]
}

const HomePage = ({ news }: NewsPageProps) => {
  return (
    <>
      <div className={styles.title}>
        <h1>NBA News</h1>
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
  );
};

// make use of static site regeneration 
export const getStaticProps = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/newsget");
    const news = response.data.articles;

    return {
      props: {
        news,
      },
      revalidate: 3600, // revalidate every hour
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        news: [],
      },
    };
  }
};

export default HomePage;
