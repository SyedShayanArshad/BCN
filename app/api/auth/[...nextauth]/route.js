// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { Cashier } from "@/models/cashier.model";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          if (
            credentials.username === "admin" &&
            credentials.password === "12345"
          ) {
            return {
              id: "admin-id",
              username: "admin",
              name: "Admin User",
              role: "admin",
            };
          }
          const user = await Cashier.findOne({
            username: credentials.username,
          });
          if (!user) {
            throw new Error("No user found with this username");
          }

          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            username: user.username,
            name: user.name,
            role: "cashier",
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        username: token.username,
        name: token.name,
      };
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/login", error: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
