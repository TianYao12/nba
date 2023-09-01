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

  return (
    <>
      <Link href="/players"> ← Back to players </Link>
      {player ? (
        <>
          <h1>{player.PLAYER}</h1>
          {/* Display other player information as needed */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
