import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const { player, year, season } = req.query;
    const mongoClient = await clientPromise;
    const players = await mongoClient
      .db("nba")
      .collection("players2")
      .find({
        PLAYER: player,
        Year: year,
        Season_type:season
      })
      .toArray();
    res.status(200).json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch players" });
  }
}
