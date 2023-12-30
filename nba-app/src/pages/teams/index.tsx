import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/teams/teams.module.css";

interface Team {
  name: string;
  full_name: string;
  conference: string;
}

interface TeamPageProps {
  teams: Team[];
}

export default function TeamPage({ teams }: TeamPageProps) {
  return (
    <div>
      <div className={styles.title}>
        <h1>NBA Teams</h1>
      </div>
      <div className={styles.grid}>
        {teams ? (
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

export const getStaticProps = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/teams/teamsapi"
    );
    const teams = response.data;

    return {
      props: {
        teams,
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        teams: [],
      },
    };
  }
};

{
  /* THIS WOULD BE TO ITERATE THROUGH ENTIRE JSON
   {Object.entries(player).map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong> {value}
      </li>
  ))} */
}
