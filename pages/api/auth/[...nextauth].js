import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as jwt from "jsonwebtoken";
import { auth } from "../../../src/utility/firebaseClient";
import { supabase } from "../../../src/utility/supabaseClient";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "login",
      name: "Firebase",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (credentials.email) {
          return await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          ).catch((error) => {
            const errorMessage = error.message;
            console.log("errorMessage", errorMessage);
            return errorMessage;
          });
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    session: { strategy: "jwt" },
  },
  jwt: {
    async encode({ secret, token }) {
      if (token) {
        return jwt.sign(token, secret);
      }
      return null;
    },
    async decode({ secret, token }) {
      if (token) {
        return jwt.verify(token, secret);
      }
      return null;
    },
  },
  callbacks: {
    // secret: process.env.JWT_SECRET,
    async jwt({ token, user, account }) {
      try {
        if (token && user) {
          const { data: role, error } = await supabase.rpc("get_role", {
            uid: user?.user?.uid,
          });
          if (error) throw error;
          if (role) {
            (token.uid = user?.user?.uid),
              (token.refreshToken = user?.user?.stsTokenManager?.refreshToken),
              (token.accessToken = user?.user?.stsTokenManager?.accessToken),
              (token.role = role),
              (token.user = user?.user?.reloadUserInfo);
          }
        }
        return token;
      } catch (e) {
        console.log("error", e);
      }
    },
    async session({ session, token, user }) {
      // console.log("role :", token);
      if (token) {
        session.role = token.role;
        session.user = token.user;
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
  },
};

export default NextAuth(authOptions);
