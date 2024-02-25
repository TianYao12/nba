import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/mongodb";
import { compare } from "bcryptjs";

/*
 * The NextAuth function configures authentication providers (Google, GitHub, and custom credentials)
 * It querys the database to see if provided email exists. If so, it compares the hashed password stored
 * in database with the hashed password provided by the user during login. If the passwords match, the user is
 * authenticated and additional information is returned. If no user is found with the provided email or
 * the passwords don't match, error messages are thrown.
 */
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
        // connect to MongoDB and get user with user email
        const mongoClient = await clientPromise;
        const user = await mongoClient
          .db("nba")
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email, so sign up!");
        }

        // compares hashed password in database with hashed password provided by user during login
        const checkPassword = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!checkPassword) {
          throw new Error("Username or Password doesn't match!");
        }

        return { ...user, email: user.email }; // add additional information if needed?
      },
    }),
  ],
  secret: "iPcb+ARdKi6sM18OJ9jzh2zVLRXu/bHq20O/H6bMDYg=",
});
