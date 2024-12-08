import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import { findUserByEmail } from "@/lib/construtor/page"

// Define an interface for the user to provide type safety
interface User {
  id: string;
  email: string;
  password: string;
  role?: string;
  name?: string;
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        // Type-safe null checks
        if (!credentials?.email || !credentials.password) {
          console.log("Email or password not provided");
          return null;
        }
  
        const user = findUserByEmail(credentials.email) as User | null;
  
        if (!user || user.password !== credentials.password) {
          console.log("User not found or invalid password");
          return null;
        }
  
        console.log("User authenticated successfully", user);
        return user;
      }
    })
  ],
  callbacks: {
    // Use explicit typing for JWT callback
    jwt: ({ token, user }) => {
      if (user) {
        console.log("Updating token with user data");
        return {
          ...token,
          id: (user as User).id,
          role: (user as User).role,
          email: (user as User).email,
          name: (user as User).name
        };
      }
      console.log("Returning existing token");
      return token;
    },
    // Use explicit typing for session callback
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role
        }
      };
    },
    // Improve type safety for redirect callback
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/Controle/`;
      }
      console.log("Redirect failed", { url, baseUrl });
      return url;
    }
  }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }