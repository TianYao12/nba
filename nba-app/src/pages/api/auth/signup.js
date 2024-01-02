import bcrypt from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";

export const addItem = async (items) => {
  const mongoClient = await clientPromise;
  const response = await mongoClient
    .db("nba")
    .collection("users")
    .insertOne(items);
  return response.insertedId;
};

export default async function handler(req, res) {
  try {
    const mongoClient = await clientPromise;
    const { username, email, password } = req.body;

    const checkExisting = await mongoClient
      .db("nba")
      .collection("users")
      .findOne({ email });

    if (checkExisting) {
      return res.status(422).json({ message: "User already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const insertedItemId = await addItem({ username, email, hashedPassword });

      res.status(200).json({
        message: "User registered successfully",
        userId: insertedItemId,
      });
    }
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
