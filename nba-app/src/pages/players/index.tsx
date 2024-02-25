import { useState } from "react";
import styles from "../../styles/search.module.css";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

/**
 * PlayersPage() renders a search interface for NBA player statistics.
 * After clicking 'search' it directs users to the dynamic URL of the searched Player
 */
export default function PlayersPage() {
  const [name, setName] = useState(""); // player name to search up
  const { push } = useRouter(); // to direct to that player's dynamic URL

  return (
    <>
      <div className={styles.search}>
        <h1 style={{ marginTop: "150px", color: "rgba(46, 2, 64, 0.8)" }}>
          Search for NBA Player Statistics
        </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Search for a player by full name"
          className={styles.searchBar}
        />
        <button
          onClick={() => push(`players/${name}`)}
          className={styles.button}
        >
          Search
        </button>
      </div>
    </>
  );
}

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
  return {
    props: {
      session,
    },
  };
};
