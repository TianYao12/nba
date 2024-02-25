import { NextApiResponse, NextApiRequest } from "next";
import clientPromise from "../../../../lib/mongodb";

// handler(req, res) retrieves all player data for all players on a specific team from the MongoDB database.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { team } = req.query; // get 'team' query parameter
    const mongoClient = await clientPromise; 
    const teams = await mongoClient
      .db("nba") 
      .collection("players2") 
      .find({
        TEAM: team,
      })
      .toArray(); // put it in array form
    res.status(200).json(teams); // if player data is successfully retrieved, return JSON response with player data
  } catch (error) { // error fetching player data
    console.error(error);
    res.status(500).json({ error: "Unable to fetch teams" });
  }
}
