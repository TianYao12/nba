import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/mongodb";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const mongoClient = await clientPromise;
        const user = await mongoClient
          .db("nba")
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email, so sign up!");
        }

        const checkPassword = await compare( // compares the bcrypt hashed credentials.password with user.hashedPasword
          credentials.password,
          user.hashedPassword 
        );

        if (!checkPassword) {
          throw new Error("Username or Password doesn't match!");
        }

        return { ...user, email: user.email }; // Include additional information if needed
      },
    }),
  ],
  secret: "iPcb+ARdKi6sM18OJ9jzh2zVLRXu/bHq20O/H6bMDYg=",
});
