import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

// hander(req, res) gets the player data for a player from the MongoDB database
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { player } = req.query; // gets 'player' query parameter
    const mongoClient = await clientPromise;
    const players = await mongoClient
      .db("nba")
      .collection("players2")
      .find({
        PLAYER: player,
      })
      .toArray();
    res.status(200).json(players); // returns JSON response back to caller
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch players" });
  }
}
