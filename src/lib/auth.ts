import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Extend Session and JWT types
declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add accessToken field
    user: {
      id?: string;  // Add id field to user object
      name?: string;
      email?: string;
      image?: string;
    };
  }

  interface JWT {
    accessToken?: string; // Add accessToken field
    id?: string;  // Add user ID to JWT
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        // Generate a JWT manually for the user
        const token = jwt.sign(
          { id: user._id, email: user.email },   // Payload
          process.env.JWT_SECRET!,               // Secret key
          { expiresIn: "1h" }                    // Token expiration time
        );
        return {
          id: user._id,
          email: user.email,
          name: user.name, 
          image: user.image,
          accessToken: token
        };
      },
    }),

    // Add GoogleProvider for Google Authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the access token and user ID in the JWT
      if (account) {
        token.accessToken = account.access_token as string;
      }
      // Check if user is returned from authorize method (i.e. during credentials login)
      if (user && (user as any).accessToken) {
        token.accessToken = (user as any).accessToken; // Explicitly cast user as any to avoid type error
      }
      token.id = token.id ?? user?.id;
      return token;
    },
    async session({ session, token }) {
      // Add the accessToken and user ID to the session object
      // Type-check to ensure accessToken is a string or undefined
      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken;
      }
      
      session.user.id = token.id as string;
      return session;
    },
  },
};