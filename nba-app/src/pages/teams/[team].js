import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../../styles/teams/team.module.css";

export default function Page() {
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { team: teamId } = router.query;

  useEffect(() => {
    fetchData();
  }, [teamId]);

  const fetchData = async () => {
    try {
      const response1 = await axios.get(`/api/teams/${teamId}`);
      setTeam(response1.data);

      const response2 = await axios.get(
        `/api/teams/roster?team=${encodeURIComponent(response1.data.full_name)}`
      );
      setPlayers(response2.data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.underline}>
        <a href="/teams">← Back to teams</a>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            {team && (
              <>
                <Image
                  src={`/teamlogos/${team.name}.png`}
                  width={100}
                  height={100}
                  alt="Team Logo"
                />
                <br />
                <a
                  href={`https://www.nba.com/${team.name}`}
                  style={{ color: "rgba(62, 0, 129, 0.912)", fontSize:"20px" }}
                >
                  {team.full_name}
                </a>
                <h2>Conference</h2>
                <p>{team.conference}</p>
                <h2>Division</h2>
                <p>{team.division}</p>
              </>
            )}
          </div>
          <div className={styles.right}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>PLAYER</th>
                  <th>POSITION</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id}>
                    <td>
                      <a href={`../players/${player.id}`}>
                        {player.first_name} {player.last_name}
                      </a>
                    </td>
                    <td>{player.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
