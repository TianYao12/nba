// React Component
import axios from "axios";
import { useState } from "react";
import styles from "../../styles/players.module.css";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Player {
  _id: string;
  Year: string;
  Season_type:string;
  PLAYER_ID:number;
  RANK:number;
  PLAYER:string;
  TEAM_ID:number  
  TEAM:string;
  GP:number;
  MIN:number;
  FGM:number;
  FGA:number;
  FG_PCT:number;
  FG3M:number;
  FG3A:number;
  FG3_PCT:number;
  FTM:number;
  FTA:number;
  FT_PCT:number;
  OREB:number;
  DREB:number;
  REB:number;
  AST:number;
  STL:number;
  BLK:number;
}

export default function PlayersPage() {
  const [name, setName] = useState("");
  const [playerData, setPlayerData] = useState<Player[] | null>(null);
  const { push } = useRouter();

  return (
    <>
      <div className={styles.search}>
        <h1 style={{ marginTop: "150px" }}>Search for NBA Player Statistics</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Search for a player by full name"
          className={styles.searchBar}
        />
        <button onClick={() => push(`players/${name}`)} className={styles.button}>
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
