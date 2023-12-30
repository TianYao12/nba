import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import axios from "axios";

export const addTeams = async (teams: any[]) => {
  const mongoClient = await clientPromise;
  const response = await mongoClient
    .db("nba")
    .collection("players2")
    .insertMany(teams);
  return response.insertedIds;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/alexnoob/BasketBall-GM-Rosters/master/player-photos.json"
    );
    const ballteams = response.data;
    const insertedIds = await addTeams(ballteams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to add teams" });
  }
};
