// React Component
import axios from "axios";
import { useState } from "react";
import styles from "../../styles/search.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

interface Player {
  _id: string;
  Year: string;
  Season_type: string;
  PLAYER_ID: number;
  RANK: number;
  PLAYER: string;
  TEAM_ID: number;
  TEAM: string;
  GP: number;
  MIN: number;
  FGM: number;
  FGA: number;
  FG_PCT: number;
  FG3M: number;
  FG3A: number;
  FG3_PCT: number;
  FTM: number;
  FTA: number;
  FT_PCT: number;
  OREB: number;
  DREB: number;
  REB: number;
  AST: number;
  STL: number;
  BLK: number;
}

export default function PlayersPage() {
  const [name, setName] = useState("");
  const [playerData, setPlayerData] = useState<Player[] | null>(null);
  const { push } = useRouter();
  const { data: session } = useSession();

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

      {playerData ? (
        <ul>
          {playerData.map((player) => (
            <li key={player._id}>
              <strong>Team:</strong> {player.TEAM}
              <br />
              <strong>Year:</strong> {player.Year}
              <br />
              <strong>Season Type:</strong> {player.Season_type}
            </li>
          ))}
        </ul>
      ) : null}
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
