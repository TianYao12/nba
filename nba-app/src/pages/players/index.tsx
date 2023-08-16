// React Component
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/players.module.css";

interface Player {
  _id: string; 
  PLAYER: string;
  TEAM: string; 
}

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [playerData, setPlayerData] = useState<Player[] | null>(null);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get<Player[]>(
        `/api/players/playerzapi?player=${searchQuery}`
      );
      setPlayerData(response.data);
      console.log(searchQuery)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.search}>
        <h2>Search for NBA Player (2012-2013 to 2021-2022 Season)</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search for a player by full name"
          className={styles.searchBar}
        />
        <button onClick={fetchPlayers} className={styles.button}>
          Search
        </button>
      </div>

      {playerData ? (
        <ul>
          {playerData.map((player) => (
            <li key={player._id}>
              <strong>Name:</strong> {player.PLAYER} 
              <br />
              <strong>Team:</strong> {player.TEAM} 
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
