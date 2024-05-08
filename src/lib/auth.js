import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";
import { Admin } from "./models";
import { connectDb } from "./utils";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { username } = credentials;
        // user is already authenticated before signIn
        await connectDb();
        const user = await Admin.findOne({ username: username });

        if (user) return JSON.parse(JSON.stringify(user));
        return null;
      },
    }),
  ],
});
