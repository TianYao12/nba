import bcrypt from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";

// add item to users collection in MongoDB database
export const addItem = async (items) => {
  const mongoClient = await clientPromise;
  const response = await mongoClient
    .db("nba")
    .collection("users")
    .insertOne(items);
  return response.insertedId;
};

// handler(req,res) checks if the user data from request body is already in the database
// if user data is not in database, it hashes the password and inserts user info into database
export default async function handler(req, res) {
  try {
    const mongoClient = await clientPromise; 
    const { username, email, password } = req.body; // destructure attributes from request body
    // check if email from request body is in MongoDB database
    const checkExisting = await mongoClient
      .db("nba")
      .collection("users")
      .findOne({ email });

    if (checkExisting) { 
      return res.status(422).json({ message: "User already exists" });
    } else { 
      const salt = bcrypt.genSaltSync(10); // random value to combine with password before hashing
      const hashedPassword = bcrypt.hashSync(password, salt); // password is synchronously hashed using salt  
      const insertedItemId = await addItem({ username, email, hashedPassword }); // inserts info into database
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
