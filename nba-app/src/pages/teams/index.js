import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/teams/teams.module.css";

export default function TeamPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get("/api/teams/teamsapi");
      setTeams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <h1>NBA Teams</h1>
      </div>
      <div className={styles.grid}>
        {teams.length > 0 ? (
          teams.map((team) => (
            <div className={styles.team}>
              <a href={`/teams/${team.name}`}>
                <Image
                  src={`/teamlogos/${team.name}.png`}
                  width={200}
                  height={200}
                  alt="Picture of NBA team logo"
                />
              </a>
              <div className={styles.teamItem}>
                <p>{team.full_name}</p>
                <p>{team.conference}</p>
              </div>
            </div>
          ))
        ) : (
          <h1>Loading teams...</h1>
        )}
      </div>
    </div>
  );
}

{
  /* THIS WOULD BE TO ITERATE THROUGH ENTIRE JSON
   {Object.entries(player).map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong> {value}
      </li>
  ))} */
}
