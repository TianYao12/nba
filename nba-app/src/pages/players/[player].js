import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/player.module.css"

export default function Player() {
  const [player, setPlayer] = useState(null);
  const [pic, setPic] = useState(null);
  const router = useRouter();
  const { player: playerName } = router.query;

  useEffect(() => {
    if (playerName) {
      fetchPlayer(playerName);
    }
  }, [playerName]);

  useEffect(() => {
    if (playerName) {
      fetchPlayerImage(playerName);
    }
  }, [playerName]);

  const fetchPlayer = async (name) => {
    try {
      const response = await axios.get(`/api/players/playerapi?player=${name}`);
      setPlayer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayerImage = async (name) => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/alexnoob/BasketBall-GM-Rosters/master/player-photos.json"
      );
      const playerImages = response.data;

      const playerKey = getKey(name);

      if (playerImages[playerKey]) {
        setPic(playerImages[playerKey]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getKey = (fullName) => {
    const nameParts = fullName.split(" ");

    const firstName = nameParts[0];
    const lastName = nameParts[1];

    const abbreviatedFirstName = firstName.slice(0, 2).toLowerCase();
    const abbreviatedLastName = lastName.slice(0, 5).toLowerCase();

    const playerKey = `${abbreviatedLastName}${abbreviatedFirstName}01`;
    return playerKey;
  };

  return (
    <>
      <Link href="/players"> ← Back to players </Link>
      <div className={styles.main}>
      {pic && <img src={pic} alt="Player" style={{ width: '300px' }} />}
      {player ? (
        <>
          {player.map((playerdata) => (
            <p key={playerdata.id}>
              <strong>Team:</strong> {playerdata.TEAM}
              <br />
              <strong>Year:</strong> {playerdata.Year}
              <br />
              <strong>Season Type: </strong>
              {playerdata.Season_type.split("%20")[0]}{" "}
              {playerdata.Season_type.split("%20")[1]}
            </p>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </>
  );
}
