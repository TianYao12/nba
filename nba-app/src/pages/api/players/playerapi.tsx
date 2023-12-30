import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { player } = req.query;
    const mongoClient = await clientPromise;
    const players = await mongoClient
      .db("nba")
      .collection("players2")
      .find({
        PLAYER: player,
      })
      .toArray();
    res.status(200).json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch players" });
  }
}
