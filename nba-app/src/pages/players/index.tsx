// React Component
import axios from "axios";
import { useState } from "react";
import styles from "../../styles/players.module.css";

interface Player {
  _id: string;
  PLAYER: string;
  TEAM: string;
  Year: string;
}

export default function PlayersPage() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [playerData, setPlayerData] = useState<Player[] | null>(null);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get<Player[]>(
        `/api/players/playerapi?player=${name}&year=${year}`
      );
      setPlayerData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.search}>
        <h1 style={{ marginTop: "150px" }}>Search for NBA Player</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Search for a player by full name"
          className={styles.searchBar}
        />
        <select
          className={styles.select}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          value={year}
        >
          <option value="">Select a Season</option>
          <option>2012-13</option>
          <option>2013-14</option>
          <option>2014-15</option>
          <option>2015-16</option>
          <option>2016-17</option>
          <option>2017-18</option>
          <option>2018-19</option>
          <option>2019-20</option>
          <option>2020-21</option>
          <option>2021-22</option>
        </select>
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
              <br />
              <strong>Year:</strong> {player.Year}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
