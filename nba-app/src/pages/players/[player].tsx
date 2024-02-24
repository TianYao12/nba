import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/player.module.css";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

interface PlayerData {
  id: number;
  Year: string;
  GP: number;
  MIN: number;
  FG_PCT: number;
  PTS: number;
  AST: number;
  REB: number;
  Season_type: string;
}

export default function Player() {
  const [player, setPlayer] = useState<PlayerData[] | null>(null); // player data
  const [pic, setPic] = useState(null); // player face picture
  const [selectedSeasonType, setSelectedSeasonType] =
    useState("Regular Season"); // season type
  const [statisticType, setStatisticType] = useState("PPG"); // performance metric

  const router = useRouter();
  const { player: playerName } = router.query as { player: string }; // get player name from query

  const fetchPlayer = async (name: string) => {
    // gets player data
    try {
      const response = await axios.get(`/api/playerapi?player=${name}`);
      setPlayer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayerImage = async (name: string) => {
    // gets player image from public json data
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

  useEffect(() => {
    if (playerName) {
      fetchPlayer(playerName);
      fetchPlayerImage(playerName);
    }
  }, [playerName]);

  // the public json data has a weird format like `${lastName}${firstName}01`, so we must turn the
  // player name into this format
  const getKey = (fullName: string) => {
    // gets player key
    const nameParts = fullName.split(" "); // fullName example is like "James Johnson"
    const firstName = nameParts[0];
    const lastName = nameParts[1];

    const abbreviatedFirstName = firstName.slice(0, 2).toLowerCase();
    const abbreviatedLastName = lastName.slice(0, 5).toLowerCase();

    const playerKey = `${abbreviatedLastName}${abbreviatedFirstName}01`;
    return playerKey;
  };

  const chartLabels = player
    ? player
        .filter((playerData) => (playerData.Season_type === "Regular%20Season" && 
        selectedSeasonType==="Regular Season") || (playerData.Season_type == "Playoffs" && selectedSeasonType === "Playoffs"))
        .map((data) => data.Year)
    : [];

  const ppg_data = player
    ? player
        .filter((playerData) => (playerData.Season_type === "Regular%20Season" && 
        selectedSeasonType==="Regular Season") || (playerData.Season_type == "Playoffs" && selectedSeasonType === "Playoffs"))
        .map((data) => data.PTS / data.GP)
    : null;

  const apg_data = player
    ? player
        .filter((playerData) => (playerData.Season_type === "Regular%20Season" && 
        selectedSeasonType==="Regular Season") || (playerData.Season_type == "Playoffs" && selectedSeasonType === "Playoffs"))
        .map((data) => data.AST / data.GP)
    : null;

  const rpg_data = player
    ? player
        .filter((playerData) => (playerData.Season_type === "Regular%20Season" && 
        selectedSeasonType==="Regular Season") || (playerData.Season_type == "Playoffs" && selectedSeasonType === "Playoffs"))
        .map((data) => data.REB / data.GP)
    : null;

    const data = {
      labels: chartLabels,
      datasets: [
          {
              label: selectedSeasonType,
              data: statisticType === "PPG" ? ppg_data : statisticType === "RPG" ? rpg_data : apg_data,
              borderColor: statisticType === "PPG" ? "#cb0c9f" : statisticType === "RPG" ? "#3e95cd" : "#c45850",
              borderWidth: 3,
              pointBorderColor: statisticType === "PPG" ? "#cb0c9f" : statisticType === "RPG" ? "#3e95cd" : "#c45850",
              pointBorderWidth: 3,
              tension: 0.5,
              fill: true,
              backgroundColor: (context: any) => {
                  const ctx = context.chart.ctx;
                  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                  gradient.addColorStop(0, statisticType === "PPG" ? "#f797e1" : statisticType === "RPG" ? "#c9f7e1" : "#f7e1c9");
                  gradient.addColorStop(1, "white");
                  return gradient;
              },
          },
      ],
  };

  // I didn't know the type of options
  const options: any = {
    plugins: {
        legend: true,
    },
    responsive: true,
    scales: {
        y: {
            ticks: {
                font: {
                    size: 20,
                    weight: "bold",
                },
            },
            title: {
                display: true,
                text: statisticType,
                padding: {
                    bottom: 10,
                },
                font: {
                    size: 30,
                    style: "italic",
                    family: "Arial",
                },
            },
            min: 0,
        },
        x: {
            ticks: {
                font: {
                    size: 20,
                    weight: "bold",
                },
            },
            title: {
                display: true,
                text: "Month",
                padding: {
                    top: 10,
                },
                font: {
                    size: 30,
                    style: "italic",
                    family: "Arial",
                },
            },
        },
    },
};

  return (
    <>
      <Link className= {styles.link} href="/players"> ← Back to players </Link>
      <div className={styles.main}>
        <div className={styles.top}>
          {pic && (
            <img
              src={pic}
              alt="Player"
              style={{
                width: "200px",
                height: "150px",
                borderRadius: "5px",
                paddingBottom: "30px",
              }}
            />
          )}
          <p className={styles.word}>{playerName}</p>
        </div>

        <select
          id="seasonTypeFilter"
          onChange={(e) => setSelectedSeasonType(e.target.value)}
          value={selectedSeasonType}
        >
          <option value="Regular Season">Regular Season</option>
          <option value="Playoffs">Playoffs</option>
        </select>

        <div className={styles.right}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Year</th>
                <th>GP</th>
                <th>MIN</th>
                <th>FG_PCT</th>
                <th>PPG</th>
                <th>APG</th>
                <th>RPG</th>
              </tr>
            </thead>
            <tbody>
              {player
                ? player
                    .filter(
                      (playerData) => (playerData.Season_type === "Regular%20Season" && 
        selectedSeasonType==="Regular Season") || (playerData.Season_type == "Playoffs" && selectedSeasonType === "Playoffs"))
                    .map((player) => (
                      <tr key={player.id}>
                        <td>{player.Year}</td>
                        <td>{player.GP}</td>
                        <td>{player.MIN}</td>
                        <td>{player.FG_PCT}</td>
                        <td>{(player.PTS / player.GP).toFixed(1)}</td>
                        <td>{(player.AST / player.GP).toFixed(1)}</td>
                        <td>{(player.REB / player.GP).toFixed(1)}</td>
                      </tr>
                    ))
                : null}
            </tbody>
          </table>
        </div>
                      
        {player ? (
          <>
              <div className={styles.chartHeader}>
                <h1>
                  {playerName}'s {selectedSeasonType} {statisticType}
                </h1>
                <select
                id="statTypeFilter"
                onChange={(e) => setStatisticType(e.target.value)}
                value={statisticType}
                className={styles.statChanger}
                >
                  <option value="PPG">PPG</option>
                  <option value="RPG">RPG</option>
                  <option value="APG">APG</option>
                </select>
              </div>
              <div className={styles.chart}
                style={{
                  width: "900px",
                  height: "400px",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <Line data={data} options={options}></Line>
              </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
