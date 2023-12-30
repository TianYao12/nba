import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const endpoint = "https://newsapi.org/v2/everything";
    const apiKey = "7c1299368f8145e78b8b35ff5fe2271e";

    const params = {
      apiKey,
      q: "NBA",
      language: "en",
    };

    const response = await axios.get(endpoint, { params });
    const articles = response.data.articles;

    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching NBA news." });
  }
}
