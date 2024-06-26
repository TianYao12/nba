import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";
import axios from "axios";

// addTeams(teams) adds teams to the MongoDB database
// export const addTeams = async (teams: any[]) => {
//   const mongoClient = await clientPromise;
//   const response = await mongoClient
//     .db("nba")
//     .collection("teams")
//     .insertMany(teams);
//   return response.insertedIds;
// };

/**
 * Retrieves top 30 teams from the "teams" collection.
 * Responds with the retrieved teams as JSON.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const mongoClient = await clientPromise;
      // retrieves top 30 teams from the "teams" collection
      const teams = await mongoClient
        .db("nba")
        .collection("teams")
        .find({})
        .limit(30)
        .toArray();
      res.status(200).json(teams); // send retrieved teams as JSON response
    } catch (error) { 
      console.error(error);
      res.status(500).json({ error: "Unable to fetch teams" });
    }
  } 
  // this was used to add team data from public API
  // it was inserted into database once and is no longer needed
  // else if (req.method === "POST") { 
  //   try {
  //     const response = await axios.get(
  //       "https://www.balldontlie.io/api/v1/teams"
  //     );
  //     const ballteams = response.data.data;
  //     const insertedIds = await addTeams(ballteams);

  //     // Retrieve the teams again from the database
  //     const client = await clientPromise;
  //     const updatedTeams = await client
  //       .db("nba")
  //       .collection("teams")
  //       .find({})
  //       .limit(100)
  //       .toArray();
  //     res.status(200).json(insertedIds);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Unable to add teams" });
  //   }
  // }
};
