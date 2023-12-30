import { NextApiResponse, NextApiRequest } from "next";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { team } = req.query;
    const mongoClient = await clientPromise;
    const teams = await mongoClient
      .db("nba")
      .collection("players2")
      .find({
        TEAM: team,
      })
      .toArray();
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch teams" });
  }
}
