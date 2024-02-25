import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/teams/teams.module.css";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";

interface Team {
  name: string;
  full_name: string;
  conference: string;
}

interface TeamPageProps {
  teams: Team[];
}
/**
 TeamPage(teams) displays all NBA teams 
 It calls the Next.js API in the getServerSideProps function to render data at request time
 */
export default function TeamPage({ teams }: TeamPageProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.title}>
        <h1>NBA {t("teams")}</h1>
      </div>
      <div className={styles.grid}>
        {teams ? (
          teams.map((team) => (
            <div className={styles.team}>
              <Link href={`/teams/${team.name}`}> {/* Links to dynamic route with full name of the team */}
                <Image
                  src={`/teamlogos/${team.name}.png`}
                  width={200}
                  height={200}
                  alt="Picture of NBA team logo"
                />
              </Link>
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

// getServerSideProps(context) renders the NBA teams at request time (would've done with getStaticProps but couldn't get it to work with sessions)
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
  try { 
    // get all teams from Next.js API
    const response = await axios.get(
      "http://localhost:3000/api/teams/teamsapi"
    );
    const teams = response.data;

    return {
      props: {
        teams,
        session,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        teams: [],
        session,
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
