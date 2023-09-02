import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Player() {
  const [player, setPlayer] = useState(null);
  const router = useRouter();
  const { player: playerName } = router.query;

  useEffect(() => {
    if (playerName) {
      fetchPlayer(playerName);
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

  useEffect(() => {
    console.log(player); // This will log the updated value of player
  }, [player]); // Add player to the dependency array

  return (
    <>
      <Link href="/players"> ← Back to players </Link>
      {player ? (
        <>
          {player.map((playerdata) => (
            <p>
              <strong>Team:</strong> {playerdata.TEAM}
              <br />
              <strong>Year:</strong> {playerdata.Year}
              <br />
              <strong>Season Type:</strong> {playerdata.Season_type}
            </p>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
