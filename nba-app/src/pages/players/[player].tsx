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

// types
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
  const [player, setPlayer] = useState<PlayerData[] | null>(null);
  const [pic, setPic] = useState(null);
  const [selectedSeasonType, setSelectedSeasonType] =
    useState("Regular%20Season");
  const router = useRouter();
  const { player: playerName } = router.query as { player: string };;

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

  const fetchPlayer = async (name:string) => {
    try {
      const response = await axios.get(`/api/players/playerapi?player=${name}`);
      setPlayer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayerImage = async (name:string) => {
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

  const getKey = (fullName:string) => {
    const nameParts = fullName.split(" ");

    const firstName = nameParts[0];
    const lastName = nameParts[1];

    const abbreviatedFirstName = firstName.slice(0, 2).toLowerCase();
    const abbreviatedLastName = lastName.slice(0, 5).toLowerCase();

    const playerKey = `${abbreviatedLastName}${abbreviatedFirstName}01`;
    return playerKey;
  };

  const chartLabels = player
    ? player
        .filter((playerData) => playerData.Season_type === selectedSeasonType)
        .map((data) => data.Year)
    : [];

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "PPG",
        data: player
          ? player
              .filter(
                (playerData) => playerData.Season_type === selectedSeasonType
              )
              .map((data) => data.PTS / data.GP)
          : null,
        borderColor: "#cb0c9f",
        borderWidth: 3,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context:any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#f797e1");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  // I didn't know what type this was so i just put any
  const options:any = {
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
          text: "PPG",
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
      <Link href="/players"> ← Back to players </Link>
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
          <option value="Regular%20Season">Regular Season</option>
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
                      (playerstats) =>
                        playerstats.Season_type === selectedSeasonType
                    )
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
            <div>
              <h1 style={{ marginTop: "90px" }}>
                {playerName} {selectedSeasonType} PPG
              </h1>
              <div
                style={{
                  width: "900px",
                  height: "400px",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <Line data={data} options={options}></Line>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
