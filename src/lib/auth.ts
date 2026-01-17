import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

type Role = "VISITOR" | "USER" | "ADMIN";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Allow all Google sign-ins
      return !!user.email;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        
        // Check admin emails list
        const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
        const isAdmin = user.email && adminEmails.includes(user.email);
        
        // Check admin domains
        const adminDomains = process.env.ADMIN_DOMAINS?.split(",").map((d) => d.trim()) || [];
        const userDomain = user.email?.split("@")[1] || "";
        const isDomainAdmin = adminDomains.includes(userDomain);
        
        token.role = (isAdmin || isDomainAdmin) ? "ADMIN" : "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role) || "USER";
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
};

// Type augmentation for session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

// Type augmentation for session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
    };
  }
}
